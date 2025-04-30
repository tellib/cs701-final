// Games Page
// Created by Berk Tellioglu

import { getGameList } from "@/lib/games/actions";
import { Card } from "@mui/joy"
import Image from "next/image";
import Link from "next/link";

export default async function GamesPage() {
  // fetches list of games from the database and renders them
  const games: {
    gameId: number;
    name: string;
    description: string | null;
    link: string | null;
    image: string | null;
    createdBy: string | null;
  }[] = await getGameList();

  return (
    <main className="p-8 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Games</h1>
      {games.map((game) => (
        <Link href={game.link!} key={game.gameId}>
          <Card>
            <div className="flex flex-row gap-4">
              <Image
                className="rounded-2xl"
                src={game.image!}
                alt={game.name}
                width={100}
                height={100}
              />
              <div className="flex flex-col justify-center">
                <div>
                  <h2 className="text-2xl font-semibold">{game.name}</h2>
                  <p>{game.description}</p>
                </div>
                <p className="text-sm text-gray-500">
                  Created by {game.createdBy}
                </p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </main>
  );
}
