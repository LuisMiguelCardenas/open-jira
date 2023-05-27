import { Layout } from "@/components/layouts";
import { EntryList, NewEntry } from "@/context/ui";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  return (
    <Layout title="Home - OpenJira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{height:'calc(100vh - 100px)'}}>
            <CardHeader title="Pendientes" />
            <CardContent>
              {/* {agregar una nueva entrada} */}
              <NewEntry/>
              <EntryList status="pending" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{height:'calc(100vh - 100px)'}}>
            <CardHeader title="En Progreso" />
            <EntryList status="in-progress" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{height:'calc(100vh - 100px)'}}>
            <CardHeader title="Terminadas" />
            <EntryList status="finished" />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
