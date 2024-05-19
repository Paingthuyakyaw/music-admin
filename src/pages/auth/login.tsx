import {
  Box,
  Button,
  Flex,
  Group,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import AuthLayout from "../../components/AuthLayout";
import { useForm } from "@mantine/form";
import classes from "./style/auth.module.css";
import { Link } from "react-router-dom";
import { useLogin } from "../../store/server/auth/mutation";

const Login = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length > 6 ? null : "Password must be greater than 6",
    },
  });

  const login = useLogin();

  return (
    <AuthLayout>
      <Flex align={"center"} justify={"center"} h={"90vh"}>
        <Box className={classes.layout} w={400}>
          <Flex mb={10} direction={"column"}>
            <Title order={3}>Welcom back!</Title>
            <Text c={"var(--mantine-color-gray-5)"} fz={14}>
              Login to your account
            </Text>
          </Flex>
          <form
            onSubmit={form.onSubmit((values) => login.mutate(values))}
            action=""
          >
            <Flex direction={"column"} gap={20}>
              <TextInput
                placeholder="example@gmail.com"
                key={form.key("email")}
                label="Email"
                {...form.getInputProps("email")}
              />
              <Flex direction={"column"}>
                <PasswordInput
                  key={form.key("password")}
                  label="Password"
                  {...form.getInputProps("password")}
                />
                <Flex gap={8} mt={4} justify={"flex-end"} fz={14}>
                  <Text fz={14}>No Account?</Text>
                  <Link to={"/register"}>create one</Link>
                </Flex>
              </Flex>
              <Group justify="flex-end">
                <Button loading={login.isPending} type="submit">
                  Login
                </Button>
              </Group>
            </Flex>
          </form>
        </Box>
      </Flex>
    </AuthLayout>
  );
};

export default Login;
