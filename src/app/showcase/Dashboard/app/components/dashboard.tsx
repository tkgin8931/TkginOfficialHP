"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { AlertCircle, Clock } from "lucide-react";
import { SensorGauge } from "./sensor-gauge";
import { ConnectionStatus } from "./connection-status";
import { AccelerometerVisualizer } from "./accelerometer-visualizer";

type SensorData = {
  accelerometer: { x: number; y: number; z: number }
  gyroscope: { x: number; y: number; z: number }
  barometer: { pressure: number }
  magnetometer: { x: number; y: number; z: number }
  timestamp: number
};

type ChartData = {
  time: string
  accelX: number
  accelY: number
  accelZ: number
  gyroX: number
  gyroY: number
  gyroZ: number
  pressure: number
  magX: number
  magY: number
  magZ: number
};

export default function DashBorad() {
    const [currentData,setCurrentData]=useState<SensorData | null>(null);
    const [historicalData, setHistoricalData]=useState<ChartData[]>([]);
    const [connectionStatus,setConnectionStatus]=useState<"connected" | "disconnected" | "connecting">("connecting");
    const [lastUpdate,setLastUpdate] = useState<string>("");

   useEffect(() => {
    
    const ws = new WebSocket("wss://6h94xswbo8.execute-api.ap-northeast-1.amazonaws.com/dev?clientId=1");

    ws.onopen = () => {
        setConnectionStatus("connected");
        console.log("WebSocket Connected");
    };

    ws.onclose = () => {
        setConnectionStatus("disconnected");
        console.log("WebSocket Disconnected");
    };

    ws.onerror = (err) => {
        console.error("WebSocket Error:", err);
        setConnectionStatus("disconnected");
    };

    ws.onmessage = (event) => {
        try {
            const newData = JSON.parse(event.data);
                setCurrentData(newData);

                const date = new Date(newData.timestamp);
                const timeString = date.toLocaleTimeString();
                setLastUpdate(timeString);

                setHistoricalData((prevData) => {
                    const newChartData = {
                        time: timeString,
                        accelX: newData.accelerometer.x,
                        accelY: newData.accelerometer.y,
                        accelZ: newData.accelerometer.z,
                        gyroX: newData.gyroscope.x,
                        gyroY: newData.gyroscope.y,
                        gyroZ: newData.gyroscope.z,
                        pressure: newData.barometer.pressure,
                        magX: newData.magnetometer.x,
                        magY: newData.magnetometer.y,
                        magZ: newData.magnetometer.z,
                    };

                    const updatedData = [...prevData, newChartData];
                    if (updatedData.length > 100) {
                        return updatedData.slice(-100);
                    }
                    return updatedData;
                });
            
        } catch (e) {
            console.error("Failed to parse message:", e);
        }
      }

    return () => {
        ws.close();
    };
}, []);


    return (
        <div className="container mx-auto p-4 text-black">
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground flex items-center gap-2 text-yellow-400">
                            <Clock className="h-4 w-4"/>
                            最終更新:{lastUpdate || "データ待機中"}
                        </div>
                        <ConnectionStatus status={connectionStatus} /> 
                    </div>
                </div>

                {connectionStatus === "disconnected" && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4"/>
                        <AlertTitle className="text-red-600 font-bold">接続エラー</AlertTitle>
                        <AlertDescription className="text-red-500">
                            Websocketサーバーに接続できません。
                        </AlertDescription>
                    </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">加速度センサー</CardTitle>
                            <CardDescription>X, Y, Z軸の加速度</CardDescription> 
                        </CardHeader>
                        <CardContent>
              <div className="flex justify-between">
                <div>
                  <div className="text-2xl font-bold">{currentData?.accelerometer.x.toFixed(2) || "0.00"}</div>
                  <p className="text-xs text-muted-foreground">X軸 (m/s²)</p>
                </div>
                <div>
                  <div className="text-2xl font-bold">{currentData?.accelerometer.y.toFixed(2) || "0.00"}</div>
                  <p className="text-xs text-muted-foreground">Y軸 (m/s²)</p>
                </div>
                <div>
                  <div className="text-2xl font-bold">{currentData?.accelerometer.z.toFixed(2) || "0.00"}</div>
                  <p className="text-xs text-muted-foreground">Z軸 (m/s²)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">ジャイロスコープ</CardTitle>
              <CardDescription>X, Y, Z軸の角速度</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <div>
                  <div className="text-2xl font-bold">{currentData?.gyroscope.x.toFixed(2) || "0.00"}</div>
                  <p className="text-xs text-muted-foreground">X軸 (rad/s)</p>
                </div>
                <div>
                  <div className="text-2xl font-bold">{currentData?.gyroscope.y.toFixed(2) || "0.00"}</div>
                  <p className="text-xs text-muted-foreground">Y軸 (rad/s)</p>
                </div>
                <div>
                  <div className="text-2xl font-bold">{currentData?.gyroscope.z.toFixed(2) || "0.00"}</div>
                  <p className="text-xs text-muted-foreground">Z軸 (rad/s)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">気圧計</CardTitle>
              <CardDescription>大気圧</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <SensorGauge value={currentData?.barometer.pressure || 0} min={900} max={1100} unit="hPa" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">地磁気センサー</CardTitle>
              <CardDescription>X, Y, Z軸の磁場</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <div>
                  <div className="text-2xl font-bold">{currentData?.magnetometer.x.toFixed(2) || "0.00"}</div>
                  <p className="text-xs text-muted-foreground">X軸 (μT)</p>
                </div>
                <div>
                  <div className="text-2xl font-bold">{currentData?.magnetometer.y.toFixed(2) || "0.00"}</div>
                  <p className="text-xs text-muted-foreground">Y軸 (μT)</p>
                </div>
                <div>
                  <div className="text-2xl font-bold">{currentData?.magnetometer.z.toFixed(2) || "0.00"}</div>
                  <p className="text-xs text-muted-foreground">Z軸 (μT)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>姿勢推定</CardTitle>
              <CardDescription>デバイスの傾きと動きの3D表示</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <AccelerometerVisualizer data={currentData?.accelerometer} />
            </CardContent>
          </Card>

           <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>センサーデータ履歴</CardTitle>
            <CardDescription>時間経過によるセンサー値の変化</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="accelerometer">
              <TabsList className="mb-4">
                <TabsTrigger value="accelerometer">加速度センサー</TabsTrigger>
                <TabsTrigger value="gyroscope">ジャイロスコープ</TabsTrigger>
                <TabsTrigger value="barometer">気圧計</TabsTrigger>
                <TabsTrigger value="magnetometer">地磁気センサー</TabsTrigger>
              </TabsList>

              <TabsContent value="accelerometer" className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="accelX" stroke="#8884d8" name="X軸" dot={false} />
                    <Line type="monotone" dataKey="accelY" stroke="#82ca9d" name="Y軸" dot={false} />
                    <Line type="monotone" dataKey="accelZ" stroke="#ff7300" name="Z軸" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>

              <TabsContent value="gyroscope" className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="gyroX" stroke="#8884d8" name="X軸" dot={false} />
                    <Line type="monotone" dataKey="gyroY" stroke="#82ca9d" name="Y軸" dot={false} />
                    <Line type="monotone" dataKey="gyroZ" stroke="#ff7300" name="Z軸" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>

              <TabsContent value="barometer" className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pressure" stroke="#8884d8" name="気圧 (hPa)" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>

              <TabsContent value="magnetometer" className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="magX" stroke="#8884d8" name="X軸" dot={false} />
                    <Line type="monotone" dataKey="magY" stroke="#82ca9d" name="Y軸" dot={false} />
                    <Line type="monotone" dataKey="magZ" stroke="#ff7300" name="Z軸" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>生データ</CardTitle>
            <CardDescription>センサーからの未加工データ</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 dark:bg-gray-300 p-4 rounded-md overflow-auto max-h-[300px]">
              {currentData ? JSON.stringify(currentData, null, 2) : "データ待機中..."}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
                </div>
        
    )

}