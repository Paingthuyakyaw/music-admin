import { Box, Flex, Image, Title } from "@mantine/core";
import { navLink } from "../assets/slide-navLink";
import { Link, useLocation } from "react-router-dom";
import classes from "./style/slide-nav.module.css";
import { useState } from "react";
import { IconCircleArrowRight } from "@tabler/icons-react";
import logo from "../assets/logo.jpeg";

const SliderNav = () => {
  const [width, setWidth] = useState(false);
  const { pathname: path } = useLocation();

  const pathname = path === "/" ? "/music" : path;

  return (
    <>
      <Box className={classes.sliderContainer} w={width ? 70 : 250}>
        {width ? (
          <Flex align={"center"} my={15} ml={20}>
            <Image src={logo} w={40} h={40} />
          </Flex>
        ) : (
          <Flex gap={10} align={"center"} my={15} ml={20}>
            <Image src={logo} w={60} h={60} />
            <Title order={4}>TuneMix</Title>
          </Flex>
        )}
        {navLink.map((nav) => {
          return (
            <Link
              key={nav.link}
              className={`${classes.link}  ${
                pathname === nav.link && classes.activeLink
              } `}
              to={nav.link}
            >
              <Flex align={"center"} ml={width ? 0 : 15}>
                <Box
                  className={`${classes.icon} `}
                  component="p"
                  w={40}
                  ml={width ? 15 : 0}
                >
                  {nav.icon}
                </Box>
                <Box
                  w={200}
                  // display={width ? "none" : "inline-block"}
                  style={{ margin: 0, fontSize: 15, padding: 0 }}
                  component="p"
                >
                  {nav.title}
                </Box>
              </Flex>
            </Link>
          );
        })}
        <button
          className={classes.slideButton}
          onClick={() => setWidth(!width)}
        >
          <IconCircleArrowRight
            size={25}
            style={{
              backgroundColor: "white",
              cursor: "pointer",
              color: "black",
              borderRadius: "50%",
            }}
          />
        </button>
      </Box>
    </>
  );
};

export default SliderNav;
