import { LogoutButton } from "@/components/auth/LogoutButton";
import NavigationBar from "@/components/NavigationBar";

export default function Home() {
  return (
    <div>
      <main>
        <NavigationBar />
        <div>피드</div>
        <LogoutButton />
      </main>
      <footer>푸우우터어어</footer>
    </div>
  );
}
