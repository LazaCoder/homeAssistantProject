import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Select,
} from "recharts";
import axios from "axios";
import { format, sub } from "date-fns";

const CustomTooltip = ({ active, payload, label, unit }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#222",
          border: "1px solid #999",
          margin: 0,
          padding: 10,
          color: "#fff",
          zIndex: 2
        }}
      >
        <p className="label">{`Timestamp: ${label}`}</p>
        <p className="intro">{`${unit}: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const formatXAxis = (tickItem) => {
  return format(new Date(tickItem), "HH:mm");
};

const HistoryChart = ({ ipAddress, entityId, unit, bearer }) => {
  const [data, setData] = useState([]);
  const [timeRange, setTimeRange] = useState("1h"); // default to 1 hour

  useEffect(() => {
    const fetchData = async () => {
      try {
        const end = new Date();
        const start = sub(end, {
          [timeRange.endsWith("h") ? "hours" : "days"]: Number(
            timeRange.slice(0, -1)
          ),
        });

        const response = await axios.get(
          `http://${ipAddress}/api/history/period/${start.toISOString()}`,
          {
            headers: {
              Authorization: `Bearer ${bearer}`,
            },
            params: {
              filter_entity_id: entityId,
              end_time: end.toISOString(),
            },
          }
        );

        const formattedData = response.data[0].map((item) => ({
          timestamp: new Date(item.last_updated).toLocaleString(),
          value: parseFloat(item.state),
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching history data:", error);
      }
    };

    fetchData();
  }, [ipAddress, entityId, bearer, timeRange]);

  return (
    <div style={{ width: "100%", height: 270 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="1h">Last 1 hour</option>
          <option value="6h">Last 6 hours</option>
          <option value="12h">Last 12 hours</option>
          <option value="24h">Last 24 hours</option>
        </select>
      </div>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            angle={-30}
            textAnchor="end"
            tickFormatter={formatXAxis}
            height={70}
          />
          <YAxis domain={["dataMin - 10", "dataMax + 10"]} />
          <Tooltip content={<CustomTooltip unit={unit} />} allowEscapeViewBox={{ x: true, y: true }} />
      
          <Line type="monotone" dataKey="value" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoryChart;
