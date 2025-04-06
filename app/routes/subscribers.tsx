import { joinWaitlist } from "~/data.server";

export const action = async ({ request }: { request: Request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get("email");

    if (!email || typeof email !== "string") {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    const result = await joinWaitlist({ email });
    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in subscribers API:", error);
    return Response.json({ error: "Failed to join waitlist" }, { status: 500 });
  }
};
