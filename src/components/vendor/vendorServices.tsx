"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Eye,
  CheckCircle,
  XCircle,
  Star,
  Grid3X3,
  List,
  RefreshCw,
  Sparkles,
  MessageSquare,
  Package,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useauth";
import { notificationService } from "@/service/NotificationService";


// Material UI Imports
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  Avatar,
  TextField,
  InputAdornment,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Tooltip,
  Divider,
  Stack,
  Skeleton,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

// Import the card component
import MyServiceCard, { Service } from "@/components/vendor/myServiceCard";
import { useParams } from "next/navigation";

// ==================== INTERFACES ====================


interface ServiceStats {
  total_services: number;
  active_services: number;
  inactive_services: number;
}

// ==================== STYLED COMPONENTS ====================

const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: "#f8fafc",
  padding: theme.spacing(3),
}));

const HeaderCard = styled(Paper)(({ theme }) => ({
  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
  borderRadius: 24,
  padding: theme.spacing(4),
  color: "white",
  position: "relative",
  overflow: "hidden",
  marginBottom: theme.spacing(3),
  "&::before": {
    content: '""',
    position: "absolute",
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    background: "rgba(255,255,255,0.1)",
    borderRadius: "50%",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -50,
    left: -50,
    width: 200,
    height: 200,
    background: "rgba(255,255,255,0.05)",
    borderRadius: "50%",
  },
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: 16,
  backgroundColor: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.2)",
  transition: "all 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.25)",
    transform: "translateY(-4px)",
  },
}));

const FilterBar = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 16,
  marginBottom: theme.spacing(3),
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(2),
  alignItems: "center",
  border: "1px solid #e5e7eb",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    backgroundColor: "white",
    "& fieldset": {
      borderColor: "#e5e7eb",
    },
    "&:hover fieldset": {
      borderColor: "#a5b4fc",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6366f1",
    },
  },
}));

const StyledSelect = styled(FormControl)(({ theme }) => ({
  minWidth: 150,
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    backgroundColor: "white",
    "& fieldset": {
      borderColor: "#e5e7eb",
    },
    "&:hover fieldset": {
      borderColor: "#a5b4fc",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6366f1",
    },
  },
}));

const EmptyStateCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(8),
  borderRadius: 24,
  textAlign: "center",
  border: "2px dashed #e5e7eb",
  backgroundColor: "#fafafa",
}));

// ==================== COMPONENT ====================

const VendorServices = () => {
  const params =useParams()
  const id = params?.id;
   
    
  const router = useRouter();
  const user = useAuth();

  // States
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [sortBy, setSortBy] = useState<
    "newest" | "oldest" | "price_high" | "price_low"
  >("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Stats
  const [stats, setStats] = useState<ServiceStats>({
    total_services: 0,
    active_services: 0,
    inactive_services: 0,
  });

  // Fetch services
  useEffect(() => {
  const fetchServices = async () => {
    setLoading(true);
    try {
      const storedUser = localStorage.getItem("user");
      const vendorId = storedUser ? JSON.parse(storedUser).id : null;

      if (!vendorId) {
        console.error("Vendor ID missing");
        notificationService.notify({
          message: "Vendor not found",
          type: "error",
        });
        return;
      }

      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://127.0.0.1:3300/api/v1/services/sub_services_by_vendor/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch vendor services");
      }
      

      const data = await res.json();
      console.log(data)

      setServices(data || []);
      updateStats(data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
      notificationService.notify({
        message: "Failed to load services",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  fetchServices();
}, []);

  // Update stats
  const updateStats = (serviceList: Service[]) => {
    setStats({
      total_services: serviceList.length,
      active_services: serviceList.filter((s) => s.active_status).length,
      inactive_services: serviceList.filter((s) => !s.active_status).length,
    });
  };

  // Filtered and sorted services
  const filteredServices = services
    .filter((service) => {
      const matchesSearch =
        service.sub_service_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && service.active_status) ||
        (statusFilter === "inactive" && !service.active_status);
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        case "oldest":
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        case "price_high":
          return b.price - a.price;
        case "price_low":
          return a.price - b.price;
        default:
          return 0;
      }
    });

  // Handlers
  const handleEdit = (service: Service) => {
    router.push(`/vendor/services/edit/${service.id}`);
  };

  const handleDelete = async (service: Service) => {
    try {
      // API call would go here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const updatedServices = services.filter((s) => s.id !== service.id);
      setServices(updatedServices);
      updateStats(updatedServices);
      notificationService.notify({
        message: "Service deleted successfully",
        type: "success",
      });
    } catch (error) {
      notificationService.notify({
        message: "Failed to delete service",
        type: "error",
      });
      throw error;
    }
  };

  const handleToggleStatus = async (service: Service) => {
    const updatedServices = services.map((s) =>
      s.id === service.id ? { ...s, active_status: !s.active_status } : s
    );
    setServices(updatedServices);
    updateStats(updatedServices);
    notificationService.notify({
      message: `Service ${
        service.active_status ? "deactivated" : "activated"
      } successfully`,
      type: "success",
    });
  };

  const handleView = (service: Service) => {
    router.push(`/services/${service.id}`);
  };

  // Render loading skeleton
  const renderSkeleton = () => (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        },
        gap: 3,
      }}
    >
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Paper key={i} sx={{ borderRadius: 4, overflow: "hidden" }}>
          <Skeleton variant="rectangular" height={200} />
          <Box sx={{ p: 2 }}>
            <Skeleton variant="text" width="80%" height={28} />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
          </Box>
        </Paper>
      ))}
    </Box>
  );

  // Render empty state
  const renderEmptyState = () => (
    <EmptyStateCard elevation={0}>
      <Avatar
        sx={{
          width: 100,
          height: 100,
          bgcolor: alpha("#6366f1", 0.1),
          mx: "auto",
          mb: 3,
        }}
      >
        <Package className="w-12 h-12 text-indigo-500" />
      </Avatar>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        No Services Found
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        {searchQuery || statusFilter !== "all"
          ? "Try adjusting your search or filters"
          : "You haven't created any services yet. Start by adding your first service!"}
      </Typography>
      <Button
        variant="contained"
        size="large"
        startIcon={<Plus className="w-5 h-5" />}
        onClick={() => router.push("/vendor/services/add")}
        sx={{
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
          borderRadius: 3,
          px: 4,
          py: 1.5,
        }}
      >
        Add Your First Service
      </Button>
    </EmptyStateCard>
  );

  // Render services grid/list
  const renderServices = () => {
    if (viewMode === "grid") {
      return (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {filteredServices.map((service, index) => (
            <MyServiceCard
              key={service.id}
              service={service}
              viewMode="grid"
              index={index}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
              onView={handleView}
            />
          ))}
        </Box>
      );
    }

    return (
      <Stack spacing={2}>
        {filteredServices.map((service, index) => (
          <MyServiceCard
            key={service.id}
            service={service}
            viewMode="list"
            index={index}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
            onView={handleView}
          />
        ))}
      </Stack>
    );
  };

  return (
    <PageContainer>
      {/* Header Section */}
      <HeaderCard elevation={0}>
        <Box sx={{ position: "relative", zIndex: 1 }}>
          {/* Header Title & Button */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "center" },
              gap: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Sparkles className="w-7 h-7" />
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight={800}>
                  My Services
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Manage and track your service listings
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              size="large"
              startIcon={<Plus className="w-5 h-5" />}
              onClick={() => router.push(`${id}/add-service`)}
              sx={{
                bgcolor: "white",
                color: "#6366f1",
                borderRadius: 3,
                px: 4,
                fontWeight: 700,
                flexShrink: 0,
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.9)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Add New Service
            </Button>
          </Box>

          {/* Stats Flexbox - Equal Width */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              mt: 4,
            }}
          >
            {[
              {
                icon: <Package className="w-5 h-5" />,
                value: stats.total_services,
                label: "Total Services",
                bgColor: "rgba(255,255,255,0.2)",
              },
              {
                icon: <CheckCircle className="w-5 h-5" />,
                value: stats.active_services,
                label: "Active",
                bgColor: "rgba(16, 185, 129, 0.3)",
              },
              {
                icon: <XCircle className="w-5 h-5" />,
                value: stats.inactive_services,
                label: "Inactive",
                bgColor: "rgba(239, 68, 68, 0.3)",
              },
            ].map((stat, index) => (
              <StatCard
                key={index}
                elevation={0}
                sx={{
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Avatar sx={{ bgcolor: stat.bgColor, width: 44, height: 44 }}>
                    {stat.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h5" fontWeight={800}>
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Box>
              </StatCard>
            ))}
          </Box>
        </Box>
      </HeaderCard>

      {/* Filter Bar */}
      <FilterBar elevation={0}>
        <StyledTextField
          placeholder="Search services..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ flex: 1, minWidth: 200 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className="w-5 h-5 text-gray-400" />
              </InputAdornment>
            ),
          }}
        />

        <StyledSelect size="small">
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) =>
              setStatusFilter(e.target.value as "all" | "active" | "inactive")
            }
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="active">
              <Stack direction="row" alignItems="center" spacing={1}>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Active</span>
              </Stack>
            </MenuItem>
            <MenuItem value="inactive">
              <Stack direction="row" alignItems="center" spacing={1}>
                <XCircle className="w-4 h-4 text-gray-500" />
                <span>Inactive</span>
              </Stack>
            </MenuItem>
          </Select>
        </StyledSelect>

        <StyledSelect size="small">
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={(e) =>
              setSortBy(
                e.target.value as
                  | "newest"
                  | "oldest"
                  | "price_high"
                  | "price_low"
              )
            }
          >
            <MenuItem value="newest">Newest First</MenuItem>
            <MenuItem value="oldest">Oldest First</MenuItem>
            <MenuItem value="price_high">Price: High to Low</MenuItem>
            <MenuItem value="price_low">Price: Low to High</MenuItem>
          </Select>
        </StyledSelect>

        <Divider orientation="vertical" flexItem />

        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Grid View">
            <IconButton
              onClick={() => setViewMode("grid")}
              sx={{
                bgcolor:
                  viewMode === "grid" ? alpha("#6366f1", 0.1) : "transparent",
                color: viewMode === "grid" ? "#6366f1" : "inherit",
              }}
            >
              <Grid3X3 className="w-5 h-5" />
            </IconButton>
          </Tooltip>
          <Tooltip title="List View">
            <IconButton
              onClick={() => setViewMode("list")}
              sx={{
                bgcolor:
                  viewMode === "list" ? alpha("#6366f1", 0.1) : "transparent",
                color: viewMode === "list" ? "#6366f1" : "inherit",
              }}
            >
              <List className="w-5 h-5" />
            </IconButton>
          </Tooltip>
        </Stack>

        <Tooltip title="Refresh">
          <IconButton onClick={() => window.location.reload()}>
            <RefreshCw className="w-5 h-5" />
          </IconButton>
        </Tooltip>
      </FilterBar>

      {/* Results Count */}
      {!loading && filteredServices.length > 0 && (
        <Typography variant="body2" color="text.secondary" mb={2}>
          Showing {filteredServices.length} of {services.length} services
        </Typography>
      )}

      {/* Content */}
      {loading
        ? renderSkeleton()
        : filteredServices.length === 0
        ? renderEmptyState()
        : renderServices()}
    </PageContainer>
  );
};

export default VendorServices;
