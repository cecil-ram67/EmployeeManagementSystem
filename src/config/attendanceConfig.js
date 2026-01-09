// Attendance & Shift Configuration

export const SHIFT_CONFIG = {
    startTime: "09:00", // 24-hour format (HH:MM)
    gracePeriodMinutes: 15, // Minutes allowed after start time before marking late

    // Helper to check if current time is late
    isLate: (date = new Date()) => {
        const [hours, minutes] = SHIFT_CONFIG.startTime.split(':').map(Number);

        const shiftStart = new Date(date);
        shiftStart.setHours(hours, minutes, 0, 0);

        const lateThreshold = new Date(shiftStart.getTime() + SHIFT_CONFIG.gracePeriodMinutes * 60000);

        // Only mark late if clocking in AFTER threshold
        // And importantly, only if it's the START of the shift (e.g., before large buffer). 
        // If someone clocks in at 2 PM, is it "Late" or "Half Day"? For simplicity, we mark anything after 9:45 AM as Late.
        return date > lateThreshold;
    }
};
