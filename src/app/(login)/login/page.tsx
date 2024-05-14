import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import config from "../../../../tailwind.config";

export default function Home() {
  return (
    <body>
      <main>
        <h2>Login</h2>
        <h1>If you don`t have an account<br/>You can<Button variant="link">Sign up here!</Button></h1>
        <p>Email</p>
        <Input placeholder="Email"></Input>
        <p>Password</p>
        <Input placeholder="Password"></Input>
        <Button size={"wide"}>Login</Button>
      </main>
      <aside>
        <p>es</p>
      </aside>
    </body>
  );
}
