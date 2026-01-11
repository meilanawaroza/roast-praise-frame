// pages/api/og.js
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get('text') || 'Roast or Praise?';
  const mode = searchParams.get('mode') || 'default';

  const bgColor = '#0f0f0f';
  const textColor = '#ffffff';
  const fontSize = mode === 'home' ? 80 : 56;
  const paddingTop = mode === 'home' ? 180 : 100;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: bgColor,
          padding: 60,
          paddingTop: paddingTop,
          textAlign: 'center',
          fontFamily: 'Inter, sans-serif',
          lineHeight: 1.4,
        }}
      >
        <div
          style={{
            color: textColor,
            fontSize: fontSize,
            fontWeight: 600,
            maxWidth: '90%',
            wordWrap: 'break-word',
          }}
        >
          {decodeURIComponent(text)}
        </div>
        {mode === 'home' && (
          <div style={{ marginTop: 60, fontSize: 32, opacity: 0.7 }}>
            by @d2kind.eth
          </div>
        )}
      </div>
    ),
    {
      width: 600,
      height: 600,
    }
  );
}
