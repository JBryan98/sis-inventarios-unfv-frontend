"use client"

import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Box, Button, CircularProgress, Collapse, Grid, IconButton, InputAdornment, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InferType, string, object } from "Yup";
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import InputForm from "@/components/ui/form/InputForm";
import PasswordInput from "@/components/ui/form/PasswordInput";
import { signIn } from "next-auth/react";
import "@/utils/validations/YupLocale";


const LoginPage = () => {
  const [error, setError] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  const authSchema = object({
    email: string().email().required().default(""),
    password: string().trim().required().min(8).default(""),
  });

  type AuthForm = InferType<typeof authSchema>;

  const { control, handleSubmit } = useForm<AuthForm>({
    defaultValues: authSchema.getDefault(),
    resolver: yupResolver(authSchema),
  });

  const router = useRouter();

  const onSubmit = async (values: AuthForm) => {
    setIsAuthenticating(true);
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false
    }).then((response) => {
      if(response?.ok){
        router.push("/hardware");
      }else{
        setIsAuthenticating(false);
        setError(true);
      }
    })
  }

  return (
    <Grid
      container
      columns={{ lg: 12, xs: 6 }}
      sx={{ overflow: "hidden", height: "100vh", position: "relative" }}
    >
      <Box component={Grid} item lg={8} display={{ xs: "none", lg: "block" }}>
        <Image
          src={"/UNFV_FIIS.png"}
          alt="LOGIN_IMG"
          width={1920}
          height={1080}
          style={{
            width: "100%",
            height: "100vh",
            objectFit: "cover",
          }}
        />
      </Box>
      <Grid
        item
        xs={6}
        lg={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          backgroundColor: "#f8fafc",
        }}
      >
        <Paper
          elevation={2}
          sx={{
            width: "450px",
            minHeight: "650px",
            backgroundColor: "#ff5d0d",
            borderRadius: "0",
            position: "absolute",
            marginRight: "-15px",
            marginTop: "15px",
            zIndex: "1",
          }}
        ></Paper>
        <Paper
          elevation={2}
          sx={{
            width: "450px",
            minHeight: "650px",
            borderRadius: "0px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "16px",
            zIndex: "100",
          }}
        >
          <Stack
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
            sx={{ width: "100%" }}
            spacing={2}
          >
            <Image
              src="/logo_aniversario.png"
              alt="UNFV_LOGO_ANIVERSARIO"
              width={1000}
              height={400}
              style={{
                width: "322px",
                height: "auto",
                margin: "auto",
              }}
            />
            <Typography variant="h4" textAlign="center">
              ¡Bienvenido!
            </Typography>
            <Box sx={{ width: "100%" }}>
              <Collapse in={error}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => setError(false)}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  Usuario o contraseña incorrectos
                </Alert>
              </Collapse>
              <Collapse in={isAuthenticating}>
                <Alert
                  severity="success"
                  action={
                    <IconButton size="small" disabled>
                      <CircularProgress color="inherit" size={18} />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  Autenticando ...
                </Alert>
              </Collapse>
            </Box>
            <InputForm
              label="Email"
              name="email"
              control={control}
              textFieldProps={{
                placeholder: "example@unfv.edu.pe",
                InputProps: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <PasswordInput
              control={control}
              label="Contraseña"
              name="password"
              startIcon
            />
            <Button
              variant="contained"
              type="submit"
              sx={{
                borderRadius: 0,
                padding: "16px",
                background: "black",
                "&:hover": { background: "black" },
              }}
              fullWidth
              onClick={() => setError(false)}
            >
              Iniciar Sesión
            </Button>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
