
export default function Home() {
  return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Welcome to the Protected Page</h1>
        <p>This content is only visible to authenticated users.</p>
      </div>
  );
} 