from os import getenv

from dotenv import load_dotenv

load_dotenv()

TWITCH_ACCESS_TOKEN = getenv("TWITCH_ACCESS_TOKEN")

from twitchio.ext import commands

class Bot(commands.Bot):

    def __init__(self):
        super().__init__(token=TWITCH_ACCESS_TOKEN, prefix="a96", initial_channels=["area96digital","yayjaybae"])

    async def event_ready(self):
        print(f'Logged in as "{self.nick}" with user id "{self.user_id}"')

    async def event_channel_joined(self, channel):
        print(f'Bot joined channel "{channel.name}"')

    async def event_message(self, message):
        print(f'{message.channel.name}/{message.author.name}: "{message.content}"')

    @commands.command()
    async def ping(self, ctx: commands.Context):
        await ctx.reply(f"Pong!")

bot = Bot()
bot.run()