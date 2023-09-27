import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    Skeleton,
    Typography,
} from "@mui/material";

export default function CardLoadingSkeleton() {
    return (
        <>
            {Array.from(Array(20)).map((_, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                    <Card
                        sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Skeleton variant="rectangular" height={"15rem"} />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                <Skeleton />
                            </Typography>
                            <Typography>
                                <Skeleton />
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Skeleton
                                variant="text"
                                sx={{
                                    fontSize: "3rem",
                                    display: "inline",
                                    width: "6rem",
                                }}
                            />
                            <Skeleton
                                variant="text"
                                sx={{
                                    fontSize: "3rem",
                                    display: "inline",
                                    width: "6rem",
                                }}
                            />
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </>
    );
}
