"use strict";(()=>{var e={};e.id=6147,e.ids=[6147],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},55315:e=>{e.exports=require("path")},33497:(e,t,a)=>{a.r(t),a.d(t,{originalPathname:()=>b,patchFetch:()=>v,requestAsyncStorage:()=>u,routeModule:()=>c,serverHooks:()=>g,staticGenerationAsyncStorage:()=>f});var i={};a.r(i),a.d(i,{GET:()=>p});var s=a(93277),n=a(15265),o=a(55356),r=a(67076);let d=require("fs");var l=a(55315);async function p(e){let t=await Object(function(){var e=Error("Cannot find module '@/lib/auth'");throw e.code="MODULE_NOT_FOUND",e}())();if(!t)return new r.NextResponse("Unauthorized",{status:401});let{searchParams:a}=new URL(e.url),i=a.get("id");if(!i)return new r.NextResponse("Transaction ID required",{status:400});let s=await Object(function(){var e=Error("Cannot find module '@/lib/db'");throw e.code="MODULE_NOT_FOUND",e}()).walletTransaction.findUnique({where:{id:i},include:{wallet:{include:{user:!0}}}});if(!s)return new r.NextResponse("Transaction not found",{status:404});if(s.wallet.userId!==t.user.id)return new r.NextResponse("Forbidden",{status:403});let n=s.wallet.user,o=Number(s.amountUsd),p=o>0,c=Math.abs(o).toFixed(2),u=new Date(s.createdAt),f=u.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),g=u.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),b={TOPUP:"Wallet Top-Up",POSTING_FEE:"Posting Fee",ESCROW_HOLD:"Escrow Hold",ESCROW_RELEASE:"Escrow Release",ESCROW_REFUND:"Escrow Refund",PAYOUT:"Provider Payout",ADVANCE:"Advance",ADVANCE_REPAYMENT:"Advance Repayment",REFUND:"Refund",ADJUSTMENT:"Adjustment"}[s.type]||s.type,v=`CA-${s.id.slice(0,8).toUpperCase()}`,h="";try{let e=(0,l.join)(process.cwd(),"public","images","logo.jpg");h=(0,d.readFileSync)(e).toString("base64")}catch{}let x=h?`data:image/jpeg;base64,${h}`:"",m=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Receipt ${v} — CouthActs</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', system-ui, sans-serif;
      color: #1a1a2e;
      background: #f8f7f4;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      padding: 40px 20px;
    }
    .receipt {
      background: white;
      max-width: 600px;
      width: 100%;
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.06);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #1E3A5F 0%, #0EA5E9 100%);
      padding: 32px 40px;
      color: white;
    }
    .header h1 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 24px;
      font-weight: 700;
    }
    .header p {
      font-size: 13px;
      opacity: 0.8;
      margin-top: 4px;
    }
    .badge {
      display: inline-block;
      margin-top: 16px;
      background: rgba(255,255,255,0.15);
      border: 1px solid rgba(255,255,255,0.25);
      border-radius: 8px;
      padding: 6px 14px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    .body { padding: 32px 40px; }
    .section { margin-bottom: 24px; }
    .section-title {
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #0EA5E9;
      margin-bottom: 12px;
    }
    .row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      padding: 8px 0;
      font-size: 14px;
    }
    .row .label { color: #6b7280; }
    .row .value { font-weight: 500; color: #1E3A5F; text-align: right; }
    .amount-row {
      background: #f0f9ff;
      margin: 0 -40px;
      padding: 16px 40px;
      border-top: 1px solid #e0f2fe;
      border-bottom: 1px solid #e0f2fe;
    }
    .amount-row .value {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 28px;
      font-weight: 700;
      color: ${p?"#059669":"#dc2626"};
    }
    .divider {
      height: 1px;
      background: #f3f4f6;
      margin: 0 0 24px 0;
    }
    .ref { font-size: 12px; color: #9ca3af; word-break: break-all; }
    .ref span { color: #6b7280; font-weight: 500; }
    .footer {
      border-top: 1px solid #f3f4f6;
      padding: 24px 40px;
      font-size: 11px;
      color: #9ca3af;
      line-height: 1.6;
    }
    .footer strong { color: #6b7280; }
    .print-btn {
      display: block;
      margin: 24px auto 0;
      background: #1E3A5F;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 12px 32px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }
    .print-btn:hover { background: #163050; }
    @media print {
      body { background: white; padding: 0; }
      .receipt { box-shadow: none; border-radius: 0; max-width: 100%; }
      .print-btn { display: none; }
    }
  </style>
</head>
<body>
  <div class="receipt">
    <div class="header">
      <div style="display:flex;align-items:center;gap:14px">
        ${x?`<img src="${x}" alt="CouthActs logo" style="width:48px;height:48px;border-radius:10px;object-fit:contain;background:white;padding:2px" />`:""}
        <div>
          <h1>CouthActs&trade;</h1>
          <p>Transaction Receipt</p>
        </div>
      </div>
      <div class="badge">${v}</div>
    </div>

    <div class="body">
      <div class="section">
        <div class="section-title">Transaction Details</div>
        <div class="row">
          <span class="label">Type</span>
          <span class="value">${b}</span>
        </div>
        <div class="row">
          <span class="label">Description</span>
          <span class="value">${s.description}</span>
        </div>
        <div class="row">
          <span class="label">Date</span>
          <span class="value">${f}</span>
        </div>
        <div class="row">
          <span class="label">Time</span>
          <span class="value">${g}</span>
        </div>
      </div>

      <div class="amount-row">
        <div class="row" style="padding:0">
          <span class="label" style="font-size:16px;font-weight:600;color:#1E3A5F">Amount</span>
          <span class="value">${p?"+":"-"}$${c}</span>
        </div>
      </div>

      <div class="section" style="margin-top:24px">
        <div class="section-title">Balance</div>
        <div class="row">
          <span class="label">Before</span>
          <span class="value">$${Number(s.balanceBefore).toFixed(2)}</span>
        </div>
        <div class="row">
          <span class="label">After</span>
          <span class="value" style="font-weight:700">$${Number(s.balanceAfter).toFixed(2)}</span>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Account Holder</div>
        <div class="row">
          <span class="label">Name</span>
          <span class="value">${n.firstName} ${n.lastName}</span>
        </div>
        <div class="row">
          <span class="label">Email</span>
          <span class="value">${n.email}</span>
        </div>
      </div>

      ${s.stripeId||s.postingId||s.bookingId||s.reference?`
      <div class="divider"></div>
      <div class="section">
        <div class="section-title">References</div>
        ${s.stripeId?`<p class="ref"><span>Stripe:</span> ${s.stripeId}</p>`:""}
        ${s.postingId?`<p class="ref"><span>Posting:</span> ${s.postingId}</p>`:""}
        ${s.bookingId?`<p class="ref"><span>Booking:</span> ${s.bookingId}</p>`:""}
        ${s.reference?`<p class="ref"><span>Ref:</span> ${s.reference}</p>`:""}
      </div>
      `:""}

      <p class="ref" style="margin-top:16px"><span>Transaction ID:</span> ${s.id}</p>

      <button class="print-btn" onclick="window.print()">Print / Save as PDF</button>
    </div>

    <div class="footer">
      <strong>CouthActs&trade;</strong> &middot; Operated by CouthActs, Inc.<br>
      All top-ups are final and non-refundable. All amounts in USD.<br>
      Intellectual property of Enemo Consulting Group, Inc.<br>
      Founded November 27, 2021 &middot; The Adolphus Tower, Dallas, TX<br>
      https://couthacts.com
    </div>
  </div>
</body>
</html>`;return new r.NextResponse(m,{headers:{"Content-Type":"text/html; charset=utf-8"}})}(function(){var e=Error("Cannot find module '@/lib/db'");throw e.code="MODULE_NOT_FOUND",e})(),function(){var e=Error("Cannot find module '@/lib/auth'");throw e.code="MODULE_NOT_FOUND",e}();let c=new s.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/wallet/receipt/route",pathname:"/api/wallet/receipt",filename:"route",bundlePath:"app/api/wallet/receipt/route"},resolvedPagePath:"/Users/ekeneenemo/Desktop/couthacts/src/app/api/wallet/receipt/route.ts",nextConfigOutput:"",userland:i}),{requestAsyncStorage:u,staticGenerationAsyncStorage:f,serverHooks:g}=c,b="/api/wallet/receipt/route";function v(){return(0,o.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:f})}}};var t=require("../../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),i=t.X(0,[916,3786],()=>a(33497));module.exports=i})();