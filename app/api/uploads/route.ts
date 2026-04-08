import { apiSuccess } from "@/lib/server/response";

export async function GET() {
  return apiSuccess(
    {
      message:
        "Файл upload API хараахан холбогдоогүй байна. Дараагийн алхамд cloud storage интеграци нэмнэ.",
    },
    { status: 501 },
  );
}
