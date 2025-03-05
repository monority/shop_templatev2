import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function RatingChart({ ratings }) {
  const [ratingCounts, setRatingCounts] = useState([]);

  useEffect(() => {
    if (ratings.length > 0) {
      const counts = [1, 2, 3, 4, 5].map((value) => ({
        rating: `${value} Stars`,
        count: ratings.filter((r) => r === value).length,
      }));
      setRatingCounts(counts);
    }
  }, [ratings]); 

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={ratingCounts}>
        <XAxis dataKey="rating" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}