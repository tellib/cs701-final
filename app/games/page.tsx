import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const games = [
  {
    id: 1,
    name: "Numdle",
    description: "Number guessing game",
    image: "/images/unknown.png",
    link: "/games/numdle",
    createdBy: "Allen Chen",
  },
  {
    id: 2,
    name: "Typing Speed",
    description: "Check your typing speed",
    image: "/images/unknown.png",
    link: "/games/typing-speed",
    createdBy: "Berk Tellioglu",
  },
  {
    id: 3,
    name: "Math Quiz",
    description: "A fun math quiz game",
    image: "/images/unknown.png",
    link: "/games/math-quiz",
    createdBy: "Berk Tellioglu",
  },
];

export default function GamesPage() {
  return (
    <main className="p-8 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Games</h1>
      {games.map((game) => (
        <Link href={game.link} key={game.id}>
          <Card className="hover:bg-gray-100 transition-all">
            <CardContent className="flex flex-row justify-between gap-4">
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{game.name}</h2>
                  <p>{game.description}</p>
                </div>
                <p className="text-sm text-gray-500">
                  Created by {game.createdBy}
                </p>
              </div>
              <Image
                src={game.image}
                alt={game.name}
                width={100}
                height={100}
              />
            </CardContent>
          </Card>
        </Link>
      ))}
    </main>
  );
}
