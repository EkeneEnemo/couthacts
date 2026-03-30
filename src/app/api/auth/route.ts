import { db } from '@/lib/db'
import { getOrCreateWallet } from '@/lib/wallet'
import { sendWelcomeEmail } from '@/lib/email'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { randomBytes } from 'crypto'

const IS_PROD = process.env.NODE_ENV === 'production'

const COOKIE_OPTIONS = {
  httpOnly: true,
  path: '/',
  sameSite: 'lax' as const,
  secure: IS_PROD,
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('couthacts_session')?.value
    if (!token) return NextResponse.json({ user: null })

    const session = await db.session.findUnique({
      where: { token },
      include: { user: { include: { provider: true, wallet: true } } },
    })

    if (!session || session.expiresAt < new Date()) {
      return NextResponse.json({ user: null })
    }

    const { user } = session
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        avatarUrl: user.avatarUrl,
        providerId: user.provider?.id ?? null,
        walletBalance: user.wallet ? Number(user.wallet.balanceUsd) : 0,
        preferredCurrency: user.preferredCurrency || "USD",
      },
    })
  } catch {
    return NextResponse.json({ user: null })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { action, email, password, firstName, lastName, role } = await req.json()

    if (action === 'register') {
      const existing = await db.user.findUnique({ where: { email } })
      if (existing) {
        return NextResponse.json({ error: 'Email already in use' }, { status: 400 })
      }

      const passwordHash = await bcrypt.hash(password, 12)
      const user = await db.user.create({
        data: { email, passwordHash, firstName, lastName, role: role || 'CUSTOMER' },
      })

      // Create wallet for the new user
      await getOrCreateWallet(user.id)

      // Send welcome email (fire-and-forget)
      sendWelcomeEmail(user.email, user.firstName).catch(() => {})

      const token = randomBytes(32).toString('hex')
      const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
      await db.session.create({ data: { userId: user.id, token, expiresAt } })

      const response = NextResponse.json({
        success: true,
        user: { id: user.id, email: user.email, role: user.role },
      })
      response.cookies.set('couthacts_session', token, {
        ...COOKIE_OPTIONS,
        expires: expiresAt,
      })
      return response
    }

    if (action === 'login') {
      const user = await db.user.findUnique({ where: { email } })
      if (!user || !user.passwordHash) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }

      const valid = await bcrypt.compare(password, user.passwordHash)
      if (!valid) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }

      const token = randomBytes(32).toString('hex')
      const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
      await db.session.create({ data: { userId: user.id, token, expiresAt } })

      const response = NextResponse.json({
        success: true,
        user: { id: user.id, email: user.email, role: user.role },
      })
      response.cookies.set('couthacts_session', token, {
        ...COOKIE_OPTIONS,
        expires: expiresAt,
      })
      return response
    }

    if (action === 'logout') {
      const token = req.cookies.get('couthacts_session')?.value
      if (token) await db.session.deleteMany({ where: { token } })
      const response = NextResponse.json({ success: true })
      response.cookies.delete('couthacts_session')
      return response
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
