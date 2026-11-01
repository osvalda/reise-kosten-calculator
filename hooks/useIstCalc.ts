import { useMemo } from "react";
import { calculateDurationFromTimeStamp, calculateElapsedTime, roundElapsedTimeToHour } from '@/app/lib/utils';
import { RoundingTypes } from "@/app/lib/definitions";

interface IstCalcResult {
    ist: string;
    isError: boolean;
    errorMessage: string;
}

interface UseIstCalcProps {
    startTime: string;
    endTime: string;
    rounding: RoundingTypes;
}

export function useIstCalc({ startTime, endTime, rounding }: UseIstCalcProps): IstCalcResult {
    return useMemo(() => {
        if (!startTime || !endTime) {
            return { ist: "", isError: false, errorMessage: "" };
        }
        try {
            const roundedTime = roundElapsedTimeToHour(
                calculateElapsedTime(calculateDurationFromTimeStamp(startTime),
                    calculateDurationFromTimeStamp(endTime)),
                rounding);
            return { ist: roundedTime + " hours", isError: false, errorMessage: "" };
        } catch (error) {
            return { ist: "", isError: true, errorMessage: error instanceof Error ? error.message : "An unknown error occurred" };
        }
    }, [startTime, endTime, rounding]);
}
