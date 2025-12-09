// lib/aiQuota.ts
import prisma from "@/utils/prisma";
import { addHours, isBefore } from "date-fns";

const HOURLY_MAX = 5; // 5 запитів / год
const DAILY_MAX = 15; // 15 запитів / день

export async function checkAndConsumeQuota(userId: string) {
  const now = new Date();

  // “сьогодні” з 00:00 (щоб співпало по дню)
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  // шукаємо запис для цього юзера і дня
  let quota = await prisma.aiQuota.findFirst({
    where: { userId, day: todayStart },
  });

  if (!quota) {
    // якщо ще немає — створюємо
    quota = await prisma.aiQuota.create({
      data: {
        userId,
        day: todayStart,
        dayCount: 0,
        hourWindowStart: now,
        hourCount: 0,
      },
    });
  }

  // 1) Перевірка денного ліміту
  if (quota.dayCount >= DAILY_MAX) {
    return {
      ok: false,
      status: 429,
      message: "Daily quota exceeded. Please try again tomorrow."
    } as const;
  }

  // 2) Перевірка годинного ліміту
  let hourWindowStart = quota.hourWindowStart;
  let hourCount = quota.hourCount;

  const windowEnd = addHours(hourWindowStart, 1);

  // якщо поточний час уже за межами поточної 1-годинної “віконки”
  // — починаємо нову
  if (isBefore(windowEnd, now)) {
    hourWindowStart = now;
    hourCount = 0;
  }

  if (hourCount >= HOURLY_MAX) {
    return {
      ok: false,
      status: 429,
      message: "Hourly quota exceeded. Please try again later.",
    } as const;
  }

  // якщо всі перевірки пройшли — інкрементуємо лічильники
  await prisma.aiQuota.update({
    where: { id: quota.id },
    data: {
      dayCount: { increment: 1 },
      hourCount: { increment: 1 },
      hourWindowStart,
    },
  });

  return { ok: true as const };
}
