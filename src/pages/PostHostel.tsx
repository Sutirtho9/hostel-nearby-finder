
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuthContext } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Navbar from '@/components/Navbar';
import { Camera, MapPin, Building, Bed, IndianRupee, Upload } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  pincode: z.string().min(6, { message: "Enter a valid pincode" }),
  nearbyUniversity: z.string().optional(),
  roomTypes: z.string().min(1, { message: "Room type is required" }),
  pricePerMonth: z.coerce.number().min(500, { message: "Price must be at least ₹500" }),
  amenities: z.string().min(3, { message: "Please list some amenities" }),
  contactNumber: z.string().min(10, { message: "Enter a valid contact number" }),
  contactEmail: z.string().email({ message: "Enter a valid email" }),
});

type FormValues = z.infer<typeof formSchema>;

const PostHostel = () => {
  const { user, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  // Redirect if not authenticated or not a hostel provider
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      toast({
        title: "Authentication Required",
        description: "Please login to post a hostel listing",
        variant: "destructive"
      });
    } else if (user?.userType !== "hostelProvider") {
      navigate('/');
      toast({
        title: "Access Denied",
        description: "Only hostel providers can post listings",
        variant: "destructive"
      });
    }
  }, [isAuthenticated, user, navigate]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      nearbyUniversity: "",
      roomTypes: "",
      pricePerMonth: 0,
      amenities: "",
      contactNumber: "",
      contactEmail: user?.email || "",
    },
  });

  const handleImageUpload = () => {
    // In a real app, we would handle file uploads to a server
    // For demo purposes, we'll just add placeholder images
    setUploadedImages([
      ...uploadedImages,
      `https://source.unsplash.com/random/800x600?hostel&sig=${Date.now()}`
    ]);
    
    toast({
      title: "Image Uploaded",
      description: "Your image has been uploaded successfully",
    });
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would send data to a backend
      console.log("Form submitted:", { ...data, images: uploadedImages });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Hostel Listed Successfully",
        description: "Your hostel has been listed. It will be visible to students soon.",
      });
      
      navigate('/');
    } catch (error) {
      console.error("Submit error:", error);
      toast({
        title: "Submission Failed",
        description: "Unable to list your hostel. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't render the form until we confirm the user is authenticated and a hostel provider
  if (!isAuthenticated || user?.userType !== "hostelProvider") {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-hostel-blue">List Your Hostel</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Hostel Details</CardTitle>
              <CardDescription>
                Provide detailed information about your hostel to attract more students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center">
                      <Building className="mr-2 text-hostel-blue" size={20} />
                      Basic Information
                    </h3>
                    
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hostel Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Sunrise Student Hostel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe your hostel, its environment, and special features..." 
                              className="min-h-24" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center">
                      <MapPin className="mr-2 text-hostel-blue" size={20} />
                      Location
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input placeholder="Street address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="State" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="pincode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pincode</FormLabel>
                            <FormControl>
                              <Input placeholder="Pincode" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="nearbyUniversity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nearby University/College (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Delhi University" {...field} />
                          </FormControl>
                          <FormDescription>
                            Mentioning nearby educational institutions helps students find your listing
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center">
                      <Bed className="mr-2 text-hostel-blue" size={20} />
                      Room & Pricing Details
                    </h3>
                    
                    <FormField
                      control={form.control}
                      name="roomTypes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Room Types</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select room types available" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="single">Single Occupancy</SelectItem>
                              <SelectItem value="double">Double Sharing</SelectItem>
                              <SelectItem value="triple">Triple Sharing</SelectItem>
                              <SelectItem value="multiple">Multiple Options Available</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="pricePerMonth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price per Month (₹)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                              <Input 
                                type="number" 
                                placeholder="e.g. 5000" 
                                className="pl-10"
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            For multiple room types, enter the starting price
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="amenities"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amenities</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="e.g. WiFi, Laundry, Mess, Hot Water, Study Room, etc." 
                              className="min-h-20" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center">
                      <Camera className="mr-2 text-hostel-blue" size={20} />
                      Photos
                    </h3>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <div className="mb-4">
                        <Button 
                          type="button"
                          variant="outline"
                          onClick={handleImageUpload}
                          className="mx-auto"
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Images
                        </Button>
                      </div>
                      
                      {uploadedImages.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                          {uploadedImages.map((image, index) => (
                            <img 
                              key={index} 
                              src={image} 
                              alt={`Hostel image ${index + 1}`} 
                              className="h-24 w-full object-cover rounded-md"
                            />
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">
                          Upload photos of your hostel to attract more students
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Contact Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="contactNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Email address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-hostel-blue hover:bg-hostel-lightBlue"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "List My Hostel"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PostHostel;
