import React, { useEffect, useState } from "react";
import "./DevicesPage.scss";
import TopSection from "components/TopSection/TopSection";
import FilterSection from "components/FilterSection/FilterSection";
import Table from "components/DevicesTable/DevicesTable";
import Header from "components/Header/Header";
import HeaderDesktop from "components/HeaderDesktop/HeaderDesktop";
import { database } from "firebase.js";
import { collection, getDocs } from "firebase/firestore";

interface Props {}

const DevicesPage = (props: Props) => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const colRef = collection(database, "devices");

    getDocs(colRef)
      .then((snapshot) => {
        let devices: any = [];

        snapshot.docs.forEach((doc) => {
          devices.push({ ...doc.data(), id: doc.id });
        });
        setDevices(devices);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="devices-page">
      <Header />
      <HeaderDesktop />
      <TopSection />
      <FilterSection />
      <Table devices={devices} />
    </div>
  );
};

export default DevicesPage;
