-- AlterTable
ALTER TABLE "public"."Booking" ADD COLUMN "slotId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Booking_slotId_key" ON "public"."Booking"("slotId");

-- CreateIndex
CREATE UNIQUE INDEX "Slot_date_startTime_key" ON "public"."Slot"("date", "startTime");

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "public"."Slot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
