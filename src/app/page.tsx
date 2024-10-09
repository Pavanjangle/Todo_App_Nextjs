import { Container } from "@mantine/core"; // Import Mantine Container
import Todo from "@/components/Todo";



export default async function Home() {
  return (
    <Container>
      {/* Wrap the content in Mantine's Container component */}
      <Todo />
    </Container>
  );
}
