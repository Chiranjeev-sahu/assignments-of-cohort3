import {React,useState} from 'react'; 
import AdoptionTable from './AdoptionTable'; 

const PetAdoptionForm = () => { 
  const initialFormData = { 
      petName: "",
      petType: "", 
      breed: "",
      adopterName: "",
      email: "",
      phone: ""
  };

  const [formData, setFormData] = useState(initialFormData);
  const [submittedRecords, setSubmittedRecords] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const recordWithId = { ...formData, id: Date.now() };
    setSubmittedRecords(currentRecords => [...currentRecords, recordWithId]);
    setShowTable(true);
    setFormData(initialFormData); 
  };

 const handleChange=(event)=>{
  console.log("From handleChange")
    const {name,value}=event.target;
    setFormData(prevData=>({
          ...prevData,
          [name]:value
    }));
 }

 const handleGoBack = () => {
    setShowTable(false);
 };

 if (showTable) {
    return <AdoptionTable records={submittedRecords} onGoBack={handleGoBack} />;
 }

  return (
    <>
      <form onSubmit={handleSubmit} className="form">

        <div>
          <label htmlFor="petName">Pet Name:</label>
          <input
            type="text"
            id="petName"
            name="petName"
            placeholder="Enter pet's name"
            value={formData.petName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="petType">Pet Type:</label>
          <select
            id="petType"
            name="petType"
            value={formData.petType}
            onChange={handleChange}
          >
            <option value="">--Select a Pet Type--</option> 
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Bird">Bird</option>
          </select>
        </div>

        <div>
          <label htmlFor="breed">Breed:</label>
          <input
            type="text"
            id="breed"
            name="breed"
            placeholder="Enter breed"
            value={formData.breed} 
            onChange={handleChange} 
          />
        </div>

        <div>
          <label htmlFor="adopterName">Your Name:</label>
          <input
            type="text"
            id="adopterName"
            name="adopterName"
            placeholder="Enter your full name"
            value={formData.adopterName} 
            onChange={handleChange} 
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email" 
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text" 
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone} 
            onChange={handleChange} 
          />
        </div>

        <div>
          <button type="submit">Submit Adoption Request</button>
        </div>
      </form>
    </>
  );
};

export default PetAdoptionForm;
