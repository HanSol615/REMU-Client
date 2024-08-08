// src/components/CustomTabs.tsx
import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css';

interface TabItem {
  eventKey: string;
  title: string;
  content: React.ReactNode;
}

interface CustomTabsProps {
  defaultActiveKey: string;
  tabs: TabItem[];
  onSelect?: (key: string) => void;
}

const UncontrolledExample: React.FC<CustomTabsProps> = ({ defaultActiveKey, tabs }) => {
  return (
    <Tabs defaultActiveKey={defaultActiveKey} id="custom-tabs" className="mb-3">
      {tabs.map((tab, index) => (
        <Tab eventKey={tab.eventKey} title={tab.title} key={index}>
          {tab.content}
        </Tab>
      ))}
    </Tabs>
  );
}

export default UncontrolledExample;