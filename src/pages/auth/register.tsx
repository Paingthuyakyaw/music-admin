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
import { useRegister } from "../../store/server/auth/mutation";

const Register = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      username: "",
      password_confirmation: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length > 6 ? null : "Password must be greater than 6",
      username: (value) => (value.length > 1 ? null : "Username required"),
      password_confirmation: (value1, value2) =>
        value1 === value2.password ? null : "Password confirm does not match",
    },
  });

  const register = useRegister();

  return (
    <AuthLayout>
      <Flex align={"center"} justify={"center"} h={"90vh"}>
        <Box className={classes.layout} w={400}>
          <Flex mb={10} direction={"column"}>
            <Title order={3}>Welcom back!</Title>
            <Text c={"var(--mantine-color-gray-5)"} fz={14}>
              Register to your account
            </Text>
          </Flex>
          <form onSubmit={form.onSubmit((values) => register.mutate(values))}>
            <Flex direction={"column"} gap={20}>
              <TextInput
                placeholder="username"
                key={form.key("username")}
                label="Username"
                {...form.getInputProps("username")}
              />
              <TextInput
                placeholder="example@gmail.com"
                key={form.key("email")}
                label="Email"
                {...form.getInputProps("email")}
              />
              <PasswordInput
                key={form.key("password")}
                label="Password"
                {...form.getInputProps("password")}
              />
              <Flex direction={"column"}>
                <PasswordInput
                  key={form.key("password_confirmation")}
                  label="Password Confirmation"
                  {...form.getInputProps("password_confirmation")}
                />
                <Flex gap={8} mt={4} justify={"flex-end"} fz={14}>
                  <Text fz={14}>Account have?</Text>
                  <Link to={"/login"}>Login</Link>
                </Flex>
              </Flex>
              <Group justify="flex-end">
                <Button loading={register.isPending} type="submit">
                  Create Account
                </Button>
              </Group>
            </Flex>
          </form>
        </Box>
      </Flex>
    </AuthLayout>
  );
};

export default Register;
