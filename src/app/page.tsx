import Page from "./login/page";

export default async function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 p-4">
      <Page />
    </div>
  );
}
