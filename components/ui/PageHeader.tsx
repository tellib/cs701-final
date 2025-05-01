// Returns the child (which should be text) as a styled <h1></h1>
// Created by Berk Tellioglu

export default function PageHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return <h1 className="text-2xl font-bold">{children}</h1>;
}
