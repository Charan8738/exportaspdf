import React, { useState } from 'react';
import { PDFDownloadLink, Document, Page, Text, View } from '@react-pdf/renderer';
import './styles.css'; // Import the CSS file

const MyDocument = ({ formData }) => (
  <Document>
    <Page>
      <View className="container">
        <Text className="label">Name: {formData.name}</Text>
        <Text className="label">Email: {formData.email}</Text>
        <Text className="label">Phone: {formData.phone}</Text>
        {/* Add more fields here based on your form structure */}
      </View>
    </Page>
  </Document>
);

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    // Add more fields here based on your form structure
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic

    // Generate the PDF blob
    const pdfBlob = (
      <PDFDownloadLink document={<MyDocument formData={formData} />} fileName="registration.pdf">
        {({ blob, url, loading, error }) => {
          if (loading) {
            return 'Loading document...';
          }
          if (error) {
            return 'Error occurred while generating PDF.';
          }
          return <a href={url} className="download-link">Download PDF</a>;
        }}
      </PDFDownloadLink>
    );

    // Use the generated PDF blob here (e.g., send it to the server, display it on the page, etc.)
    console.log(pdfBlob);
  };

  return (
    <div className="form-group">
      <h1 style={{paddingLeft:700}}>Download as pdf</h1>
    <div style={{paddingLeft:200,paddingRight:200,paddingTop:30}}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="input" />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="input" />
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input" />
        </div>

        {/* Add more fields here based on your form structure */}

        <button type="submit" className="button">Submit</button>
      </form>

      {/* Render the PDF download link */}
      {formData.name && formData.email && formData.phone && (
        <PDFDownloadLink document={<MyDocument formData={formData} />} fileName="registration.pdf">
          {({ blob, url, loading, error }) => {
            if (loading) {
              return 'Loading document...';
            }
            if (error) {
              return 'Error occurred while generating PDF.';
            }
            return <a href={url} className="download-link">Download PDF</a>;
          }}
        </PDFDownloadLink>
      )}
    </div>
    </div>
  );
};

export default RegistrationForm;
