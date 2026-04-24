"use client";

import { useEffect, useRef } from "react";
import type { Map as MapLibreMap, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

/**
 * Interactive tracking map. Uses MapLibre GL JS with the free demotiles
 * style (good enough for most tracking views; swap `STYLE_URL` for a
 * self-hosted tile server or MapTiler key when you have one).
 *
 * Props:
 *   origin      — pickup coords
 *   destination — dropoff coords
 *   current     — optional live vehicle position (shown as a green pulse)
 *   history     — optional path trace (breadcrumbs)
 *
 * The component SSRs as an aspect-ratio placeholder so layout doesn't jump
 * when maplibre-gl lazy-loads on the client.
 */

const STYLE_URL = "https://demotiles.maplibre.org/style.json";

export type MapPoint = { lat: number; lng: number };

export function TrackingMap({
  origin,
  destination,
  current,
  history = [],
  height = "420px",
  className,
}: {
  origin: MapPoint;
  destination: MapPoint;
  current?: MapPoint;
  history?: MapPoint[];
  height?: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Marker[]>([]);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;
    let cancelled = false;

    async function init() {
      const maplibregl = await import("maplibre-gl");
      if (cancelled || !containerRef.current) return;

      const centerLng = (origin.lng + destination.lng) / 2;
      const centerLat = (origin.lat + destination.lat) / 2;

      const map = new maplibregl.Map({
        container: containerRef.current,
        style: STYLE_URL,
        center: [centerLng, centerLat],
        zoom: 3.5,
        attributionControl: { compact: true },
      });
      mapRef.current = map;
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

      map.on("load", () => {
        if (cancelled) return;
        // Route line (origin → destination).
        map.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: [
                [origin.lng, origin.lat],
                [destination.lng, destination.lat],
              ],
            },
          },
        });
        map.addLayer({
          id: "route-line",
          type: "line",
          source: "route",
          layout: { "line-cap": "round", "line-join": "round" },
          paint: {
            "line-color": "#007AFF",
            "line-width": 3,
            "line-opacity": 0.8,
            "line-dasharray": [1, 1.5],
          },
        });

        // Breadcrumb trail, if provided.
        if (history.length > 1) {
          map.addSource("trail", {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: history.map((p) => [p.lng, p.lat]),
              },
            },
          });
          map.addLayer({
            id: "trail-line",
            type: "line",
            source: "trail",
            paint: { "line-color": "#34C759", "line-width": 3, "line-opacity": 0.9 },
          });
        }

        // Markers
        const mk = (lng: number, lat: number, color: string, label: string) => {
          const el = document.createElement("div");
          el.style.cssText = `display:flex;align-items:center;justify-content:center;height:30px;width:30px;border-radius:9999px;background:${color};color:#fff;font-size:12px;font-weight:700;box-shadow:0 4px 12px rgba(0,0,0,0.18);border:2px solid #fff`;
          el.textContent = label;
          return new maplibregl.Marker({ element: el }).setLngLat([lng, lat]).addTo(map);
        };

        markersRef.current = [];
        markersRef.current.push(mk(origin.lng, origin.lat, "#1D1D1F", "A"));
        markersRef.current.push(mk(destination.lng, destination.lat, "#FF7A59", "B"));
        if (current) {
          const el = document.createElement("div");
          el.setAttribute("role", "img");
          el.setAttribute("aria-label", "Current location");
          el.style.cssText =
            "position:relative;height:18px;width:18px;border-radius:9999px;background:#34C759;border:3px solid #fff;box-shadow:0 0 0 4px rgba(52,199,89,0.25)";
          markersRef.current.push(
            new maplibregl.Marker({ element: el }).setLngLat([current.lng, current.lat]).addTo(map),
          );
        }

        // Fit bounds to all points.
        const points: [number, number][] = [
          [origin.lng, origin.lat],
          [destination.lng, destination.lat],
        ];
        if (current) points.push([current.lng, current.lat]);
        history.forEach((p) => points.push([p.lng, p.lat]));
        const lngs = points.map((p) => p[0]);
        const lats = points.map((p) => p[1]);
        const sw: [number, number] = [Math.min(...lngs), Math.min(...lats)];
        const ne: [number, number] = [Math.max(...lngs), Math.max(...lats)];
        map.fitBounds([sw, ne], { padding: 60, duration: 0, maxZoom: 10 });
      });
    }

    init();

    return () => {
      cancelled = true;
      markersRef.current.forEach((m) => m.remove());
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // Re-init when any coord changes identity. In practice callers pass
    // stable refs, so this is fine.
  }, [origin, destination, current, history]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: "100%", height, borderRadius: "1.5rem", overflow: "hidden" }}
      aria-label="Shipment tracking map"
      role="region"
    />
  );
}
