import { Box, Rating, Typography } from "@mui/material";


// Komponent för att visa produktens snittbetyg och det totala antalet kundbetyg
function ProductRatingSummary({ avg, count }) {
  const avgValue = avg != null && Number.isFinite(avg) ? avg : 0;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
        <Rating value={avgValue} precision={0.5} readOnly size="large" />
        <Typography variant="body2" color="text.secondary">
          {avg != null && Number.isFinite(avg) ? avg.toFixed(1) : "0.0"} / 5
        </Typography>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        {count != null && Number.isFinite(count) && count > 0
          ? `${count} betyg`
          : "Inga betyg ännu"}
      </Typography>
    </Box>
  );
}

export default ProductRatingSummary;

