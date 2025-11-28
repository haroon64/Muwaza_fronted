"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Divider,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  LocationOn,
  Phone,
  Email,
} from "@mui/icons-material";

export default function Footer() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: Facebook, url: "https://facebook.com" },
    { icon: Twitter, url: "https://twitter.com" },
    { icon: Instagram, url: "https://instagram.com" },
    { icon: LinkedIn, url: "https://linkedin.com" },
  ];

  // Contact information
  const contactInfo = {
    address: "1st Floor, opposite McDonald's, Block A Central Park Housing Scheme, Lahore, Pakistan",
    phone: "+92 (555) 123-4567",
    email: "support@servicehub.com",
    companyName: "Muawza"
  };

  // Navigation handlers
  const handleLocationClick = () => {
    const encodedAddress = encodeURIComponent(contactInfo.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const handleEmailClick = () => {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${contactInfo.email}`, '_blank');
  };

  const handlePhoneClick = () => {
    window.open(`tel:${contactInfo.phone}`, '_self');
  };

  return (
    <Box
      component="footer"
      sx={{
        background: "#3730a3",
        color: "white",
        py: 8,
        mt: "auto",
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                variant="h4"
                component="div"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  background: "linear-gradient(45deg, #fff, #a5b4fc)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                {contactInfo.companyName}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: "grey.300" }}>
                Connecting professionals with customers seamlessly. Find the best services near you or grow your business with our platform.
              </Typography>
              
              {/* Contact Info */}
              <Stack spacing={1} sx={{ mb: 3 }}>
                {/* Location with click handler */}
                <Box 
                  sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 1,
                    cursor: "pointer",
                    "&:hover": { color: "primary.light" },
                    transition: "color 0.3s ease",
                  }}
                  onClick={handleLocationClick}
                >
                  <LocationOn sx={{ color: "primary.light", fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: "inherit" }}>
                    {contactInfo.address}
                  </Typography>
                </Box>

                {/* Phone with click handler */}
                <Box 
                  sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 1,
                    cursor: "pointer",
                    "&:hover": { color: "primary.light" },
                    transition: "color 0.3s ease",
                  }}
                  onClick={handlePhoneClick}
                >
                  <Phone sx={{ color: "primary.light", fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: "inherit" }}>
                    {contactInfo.phone}
                  </Typography>
                </Box>

                {/* Email with click handler */}
                <Box 
                  sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 1,
                    cursor: "pointer",
                    "&:hover": { color: "primary.light" },
                    transition: "color 0.3s ease",
                  }}
                  onClick={handleEmailClick}
                >
                  <Email sx={{ color: "primary.light", fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: "inherit" }}>
                    {contactInfo.email}
                  </Typography>
                </Box>
              </Stack>

              {/* Social Media */}
              <Box sx={{ display: "flex", gap: 1 }}>
                {socialLinks.map(({ icon: Icon, url }, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconButton
                      component="a"
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: "grey.300",
                        backgroundColor: "rgba(255,255,255,0.1)",
                        "&:hover": {
                          backgroundColor: "primary.main",
                          color: "white",
                        },
                      }}
                    >
                      <Icon />
                    </IconButton>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
                Quick Links
              </Typography>
              <Stack spacing={1}>
                {["Home", "Services", "About"].map((item) => (
                  <Link
                    key={item}
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography
                      sx={{
                        color: "grey.300",
                        "&:hover": {
                          color: "primary.light",
                          transform: "translateX(4px)",
                        },
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                      }}
                    >
                      {item}
                    </Typography>
                  </Link>
                ))}
              </Stack>
            </motion.div>
          </Grid>

          {/* CTA Section - Optional */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Add your CTA content here if needed */}
            </motion.div>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.1)" }} />

        {/* Copyright */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: "grey.400" }}>
            © {currentYear} {contactInfo.companyName}. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            {[
              { label: "Privacy Policy", path: "privacy-policy" },
              { label: "Terms & Conditions", path: "Term-and-Conditions" },
              { label: "Cookie Policy", path: "cookie-policy" }
            ].map((item) => (
              <Link
                key={item.path}
                href={`/${item.path}`}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "grey.400",
                    "&:hover": { color: "primary.light" },
                    transition: "color 0.3s ease",
                  }}
                >
                  {item.label}
                </Typography>
              </Link>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}