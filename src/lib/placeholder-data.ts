
import type { Doctor, Appointment, MedicalDocument, BedInfo, Ambulance, Medication, VitalSign } from './types';

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Emily Carter',
    specialty: 'Cardiologist',
    experience: 12,
    hospital: 'Unity General Hospital',
    availability: 'available',
    consultationFee: 250,
    avatarUrl: 'https://picsum.photos/seed/doc1/200/200',
    bio: 'Dr. Carter is a renowned cardiologist with over a decade of experience in treating heart conditions and promoting cardiovascular wellness.'
  },
  {
    id: '2',
    name: 'Dr. Ben Adams',
    specialty: 'Neurologist',
    experience: 8,
    hospital: 'City Central Hospital',
    availability: 'available',
    consultationFee: 220,
    avatarUrl: 'https://picsum.photos/seed/doc2/200/200',
    bio: 'Specializing in neurological disorders, Dr. Adams is dedicated to providing compassionate care and innovative treatments.'
  },
  {
    id: '3',
    name: 'Dr. Chloe Davis',
    specialty: 'Pediatrician',
    experience: 15,
    hospital: 'St. Jude Children\'s Hospital',
    availability: 'unavailable',
    consultationFee: 180,
    avatarUrl: 'https://picsum.photos/seed/doc3/200/200',
    bio: 'A leading pediatrician, Dr. Davis has a passion for children\'s health and wellbeing, from infancy through adolescence.'
  },
    {
    id: '4',
    name: 'Dr. James Wilson',
    specialty: 'Orthopedic Surgeon',
    experience: 20,
    hospital: 'Unity General Hospital',
    availability: 'available',
    consultationFee: 300,
    avatarUrl: 'https://picsum.photos/seed/doc4/200/200',
    bio: 'Dr. Wilson is a board-certified orthopedic surgeon specializing in joint replacement and sports medicine.'
  },
];

export const appointments: Appointment[] = [
  {
    id: '1',
    patientName: 'John Doe',
    doctorName: 'Dr. Emily Carter',
    doctorSpecialty: 'Cardiologist',
    date: '2024-08-15',
    time: '10:30 AM',
    status: 'upcoming',
    token: 5,
  },
  {
    id: 'a2',
    patientName: 'Michael Brown',
    doctorName: 'Dr. Emily Carter',
    doctorSpecialty: 'Cardiologist',
    date: '2024-08-15',
    time: '10:45 AM',
    status: 'upcoming',
    token: 6,
  },
   {
    id: 'a3',
    patientName: 'Jessica Williams',
    doctorName: 'Dr. Emily Carter',
    doctorSpecialty: 'Cardiologist',
    date: '2024-08-15',
    time: '11:00 AM',
    status: 'upcoming',
    token: 7,
  },
  {
    id: '2',
    patientName: 'Jane Smith',
    doctorName: 'Dr. Ben Adams',
    doctorSpecialty: 'Neurologist',
    date: '2024-07-20',
    time: '02:00 PM',
    status: 'completed',
    token: 12,
  },
];

export const medicalDocuments: MedicalDocument[] = [
  {
    id: '1',
    name: 'Annual Checkup Report',
    type: 'report',
    uploadDate: '2024-06-01',
    url: '#',
  },
  {
    id: '2',
    name: 'Allergy Medication Prescription',
    type: 'prescription',
    uploadDate: '2024-05-15',
    url: '#',
  },
  {
    id: '3',
    name: 'Consultation Invoice - May',
    type: 'invoice',
    uploadDate: '2024-05-15',
    url: '#',
  },
];

export const medications: Medication[] = [
    { id: '1', name: 'Metformin', dosage: '500mg', frequency: 'Twice a day', status: 'active', refillsRemaining: 3 },
    { id: '2', name: 'Lisinopril', dosage: '10mg', frequency: 'Once a day', status: 'active', refillsRemaining: 5 },
    { id: '3', name: 'Atorvastatin', dosage: '20mg', frequency: 'Once a day', status: 'inactive', refillsRemaining: 0 },
    { id: '4', name: 'Amoxicillin', dosage: '250mg', frequency: 'Three times a day', status: 'inactive', refillsRemaining: 0 },
];

export const bedAvailability: BedInfo[] = [
    { type: 'ICU', total: 20, occupied: 18, available: 2 },
    { type: 'General', total: 150, occupied: 125, available: 25 },
    { type: 'Ward', total: 50, occupied: 40, available: 10 },
];

export const ambulanceAvailability: Ambulance[] = [
    { id: '1', vehicleNumber: 'AMB-001', driverName: 'Mike Ross', status: 'available', location: { lat: 12.9716, lng: 77.5946 } },
    { id: '2', vehicleNumber: 'AMB-002', driverName: 'Sarah Connor', status: 'on-duty', location: { lat: 12.9816, lng: 77.6046 } },
    { id: '3', vehicleNumber: 'AMB-003', driverName: 'Kyle Reese', status: 'maintenance', location: { lat: 12.9616, lng: 77.5846 } },
];

export const vitals: VitalSign[] = [
  { id: "1", name: "Blood Pressure", value: "120/80", unit: "mmHg", date: "2024-07-20", trend: "stable" },
  { id: "2", name: "Blood Glucose", value: "95", unit: "mg/dL", date: "2024-07-20", trend: "down" },
  { id: "3", name: "BMI", value: "22.5", unit: "kg/m²", date: "2024-07-20", trend: "stable" },
]
