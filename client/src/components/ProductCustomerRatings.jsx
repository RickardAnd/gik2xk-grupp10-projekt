import { Box, Paper, Rating, Typography } from "@mui/material";

// Komponent för att visa en lista med alla kundbetyg för en specifik produkt
function ProductCustomerRatings({ ratings }) {
  return (
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
        Betyg från kunder
      </Typography>

      {ratings?.length > 0 ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {ratings.map((r) => (
            <Paper
              key={`${r.rating}_${String(r.createdAt)}`}
              variant="outlined"
              sx={{ p: 1 }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Rating value={r.rating} readOnly size="small" />
                <Typography variant="body2" color="text.secondary">
                  {r.createdAt ? new Date(r.createdAt).toLocaleDateString("sv-SE") : ""}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      ) : (
        <Typography variant="body2" color="text.secondary">
          Inga betyg ännu.
        </Typography>
      )}
    </Box>
  );
}

export default ProductCustomerRatings;