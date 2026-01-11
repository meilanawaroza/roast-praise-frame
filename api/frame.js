// api/frame.js
export default async function handler(req, res) {
  const body = req.body || {};
  const { untrustedData } = body;
  const displayName = untrustedData?.displayName || "Farcaster friend";

  const roasts = [
    `${displayName}, your casts are fire... too bad only bots see them.`,
    `Bro ${displayName}, you post more than you sleep. Where’s the ROI?`,
    `${displayName}? You’re bullish on everything — yet your portfolio’s still in hibernation.`,
    `Your follower count is lower than your ETH gas limit. Stay strong.`,
    `You’ve got the energy of a degen, but the engagement of a rock. Respect.`,
    `${displayName}, you’re not ghosting — you’re just invisible on the graph.`,
    `Casting daily like it’s your job… too bad no one’s hiring.`,
    `You reply to OGs like you know them. Newsflash: they don’t know you.`,
    `Your takes are so hot, even your wallet’s sweating. Still red though.`,
    `${displayName}, you’re the reason “engagement farming” exists. Carry on.`,
    `You’ve got more drafts than followers. Time to hit send… or therapy.`,
    `Chart looks greener than your DMs. Keep grinding, soldier.`
  ];

  const praises = [
    `Shoutout to ${displayName}! Your takes actually make me think — rare in this timeline.`,
    `${displayName}, you’re the hidden gem this feed needs. Keep shining.`,
    `The world needs more builders like you, ${displayName}. Don’t stop.`,
    `Every cast from ${displayName} is serotonin for my feed. Thank you.`,
    `You’re not just posting — you’re curating culture. Legendary, ${displayName}.`,
    `Low followers? High signal. That’s the ${displayName} paradox.`,
    `In a sea of noise, you’re the signal. Much love, ${displayName}.`,
    `${displayName}, your consistency is inspiring. The internet needs your voice.`,
    `You don’t chase trends — you set them. Quietly legendary.`,
    `Real ones know: ${displayName} is top 1% of Farcaster brains.`,
    `Not loud, not spammy — just pure value. That’s you, ${displayName}.`,
    `While others flex, you build. That’s why we stan, ${displayName}.`
  ];

  let message = "";
  let buttonIndex = untrustedData?.buttonIndex;

  if (buttonIndex === 1) {
    message = roasts[Math.floor(Math.random() * roasts.length)];
  } else if (buttonIndex === 2) {
    message = praises[Math.floor(Math.random() * praises.length)];
  }

  const encodedMessage = encodeURIComponent(`"${message}"`);

  if (message) {
    const imageUrl = `https://${req.headers.host}/api/og?text=${encodedMessage}`;
    const tipLink = `https://warpcast.com/~/tip/498765`; // d2kind.eth

    res.status(200).json({
      version: "vNext",
      image: imageUrl,
      buttons: [
        {
          text: "📤 Post to Farcaster",
          action: "link",
          target: `https://warpcast.com/~/compose?text=${encodeURIComponent(message + " via @d2kind.eth")}`
        },
        {
          text: "☕ Tip the Creator",
          action: "link",
          target: tipLink
        },
        {
          text: "⬅️ Back",
          action: "post",
          target: "/api/frame"
        }
      ]
    });
  } else {
    const homeImageUrl = `https://${req.headers.host}/api/og?text=Roast%20or%20Praise%3F&mode=home`;
    res.status(200).json({
      version: "vNext",
      image: homeImageUrl,
      buttons: [
        { text: "🔥 Roast Me", action: "post" },
        { text: "✨ Praise Me", action: "post" }
      ],
      postUrl: "/api/frame"
    });
  }
}
