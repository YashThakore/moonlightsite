export const categories = [
  {
    name: "Moderation",
    commands: [
      { name: "ban", description: "Ban a user from the server", usage: "/ban @user [reason]" },
      { name: "kick", description: "Kick a user from the server", usage: "/kick @user [reason]" },
      { name: "mute", description: "Mute a user in the server", usage: "/mute @user [duration]" },
      { name: "warn", description: "Warn a user", usage: "/warn @user [reason]" },
    ],
  },
  {
    name: "Music",
    commands: [
      { name: "play", description: "Play a song", usage: "/play [query]" },
      { name: "pause", description: "Pause the current song", usage: "/pause" },
      { name: "skip", description: "Skip to the next song", usage: "/skip" },
      { name: "queue", description: "Show current queue", usage: "/queue" },
    ],
  },
  {
    name: "Fun",
    commands: [
      { name: "meme", description: "Show a random meme", usage: "/meme" },
      { name: "8ball", description: "Ask the magic 8ball a question", usage: "/8ball [question]" },
    ],
  },
]
