import type { Route } from "./+types/home";
import { Form } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [{ title: "POC" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const example = "Example";

  console.log("Example", { example });

  return { data: example };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const contactFormData = {
    name: formData.get("name"),
    message: formData.get("message"),
  };

  console.log("Form submitted:", contactFormData);

  return { data: contactFormData };
}

export default function Contact({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Contact Us</h1>
      <section className="p-4">
        <Form method="post" className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </Form>

        <pre className="text-xs">
          {JSON.stringify({ loaderData, actionData }, null, 2)}
        </pre>
      </section>
    </div>
  );
}
