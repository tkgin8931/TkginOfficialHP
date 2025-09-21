"use client"

import { useState, useEffect} from "react";
import { Progress } from "../../components/ui/progress";

interface SensorGaugeProps {
    value: number
    min: number
    max: number
    unit: string
}

export function SensorGauge({ value, min, max, unit }: SensorGaugeProps){
    const [progress,setProgress] = useState(0);
    
    useEffect(() => {
        const percentage = (( value - min ) / ( max -min ))*100
        setProgress(Math.max(0,Math.min(100,percentage)))
    },[value,min,max])

    return (
        <div className="w-full space-y-2">
            <div className="text-3xl font-bold text-center">
                {value.toFixed(1)}
                <span className="text-sm font-normal ml-1">
                    {unit}
                </span>
            </div>
            <Progress value={progress} className="h-3"/>
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>{min}{unit}</span>
                <span>{max}{unit}</span>
            </div>
        </div>
    )
}