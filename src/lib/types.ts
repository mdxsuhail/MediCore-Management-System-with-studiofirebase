
export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'patient' | 'doctor' | 'admin';
  dob?: string;
  phone?: string;
  address?: string;
  emergencyContact?: {
    name: string;
    phone: string;
  };
};

export type Doctor = {
  id:string;
  name: string;
  specialty: string;
  experience: number;
  hospital: string;
  availability: 'available' | 'unavailable';
  consultationFee: number;
  avatarUrl: string;
  bio: string;
};

export type Appointment = {
  id: string;
  patientName: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  token: number;
};

export type MedicalDocument = {
  id: string;
  name: string;
  type: 'prescription' | 'report' | 'invoice';
  uploadDate: string;
  url: string;
};

export type BedInfo = {
  type: 'ICU' | 'General' | 'Ward' | 'Private Room' | 'Semi-Private Room';
  total: number;
  occupied: number;
  available: number;
  features: string[];
  price: number;
};

export type HospitalBedInfo = {
    hospitalName: string;
    beds: BedInfo[];
};

export type Ambulance = {
  id: string;
  vehicleNumber: string;
  driverName: string;
  status: 'available' | 'on-duty' | 'maintenance';
  location: {
    lat: number;
    lng: number;
  };
};

export type Medication = {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  status: 'active' | 'inactive';
  refillsRemaining: number;
};

export type VitalSign = {
  id: string;
  name: "Blood Pressure" | "Blood Glucose" | "BMI";
  value: string;
  unit: string;
  date: string;
  trend: "up" | "down" | "stable";
}

export type VitalsLogEntry = {
    id: string;
    name: "Blood Pressure" | "Blood Glucose" | "BMI";
    value: string;
    unit: string;
    date: string;
};

export type Invoice = {
  id: string;
  description: string;
  date: string;
  amount: string;
  status: 'Paid' | 'Unpaid';
}
