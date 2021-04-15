import React, { useState } from "react";
import { CSVReader, jsonToCSV, CSVDownloader } from "react-papaparse";

import LeftMenu from "./left_menu";

const {
  indoor_export,
  outdoor_export,
  import_csv,
  view_indoor,
} = require("../controller/functions");

const MasterData = () => {
  const [masterData, setMasterData] = useState([]);
  const [importType, setImportType] = useState("");
  const [exportType, setExportType] = useState("");
  const [view, setView] = useState("");
  const [exportData, setExportData] = useState([]);
  const [viewData, setViewData] = useState([]);

  const handleOnDrop = (data) => {
    let master_data = [];
    data.map((index) => {
      master_data.push(index.data);

      return index;
    });

    setMasterData(master_data);
  };

  const reset_import = (e) => {
    e.preventDefault();
    setMasterData([]);
    setImportType("");
  };

  const reset_export = (e) => {
    e.preventDefault();
    setMasterData([]);
    setExportType("");
  };

  const reset_view = (e) => {
    e.preventDefault();
    setView("");
  };

  const import_type_change = (e) => {
    setImportType(e.target.value);
  };

  const import_csv_data = () => {
    let data = [];

    data.push({
      type: importType,
      master_data: masterData,
    });

    import_csv(JSON.stringify(data));
  };

  const export_type_change = (e) => {
    setExportType(e.target.value);

    if (e.target.value === "indoor_unit") {
      indoor_export()
        .then((res) => {
          setExportData(jsonToCSV(res));
        })
        .catch((err) => {});
    } else if (e.target.value === "outdoor_unit") {
      outdoor_export()
        .then((res) => {
          setExportData(jsonToCSV(res));
        })
        .catch((err) => {});
    } else {
      setExportData([]);
    }
  };

  const view_change = (e) => {
    setView(e.target.value);
  };

  const view_config = () => {
    if (view === "indoor_unit") {
      view_indoor().then((res) => {
        setViewData(res);
      });
    } else if (view === "outdoor_unit") {
      view_indoor().then((res) => {
        setViewData(res);
      });
    } else {
      setViewData([]);
    }
  };

  return (
    <div className="summary-container h-100">
      <div className="row mx-2">
        <div className="col-12 ">
          <h1>SMART PRODUCTION</h1>
        </div>
      </div>
      <LeftMenu />
      <div id="content">
        <h2 className="text-center mt-4 mb-0">
          <b>Master Data</b>
        </h2>
        <hr className="hr-header" />
        <div className="d-flex-left px-4">
          <div className="summary-select">
            <label className="mb-1">Type of Data</label>
            <select
              className="pl-2"
              name="type"
              value={importType}
              onChange={import_type_change}
            >
              <option>----- Select -----</option>
              <option value="indoor_unit">Indoor Unit</option>
              <option value="outdoor_unit">Outdoor Unit</option>
            </select>
          </div>
          <div className="pl-4">
            <label className="mb-1 d-block">&nbsp;</label>
            <CSVReader onDrop={handleOnDrop} noDrag addRemoveButton>
              <span>Click to upload.</span>
            </CSVReader>
          </div>
          <div className="summary-input pl-4">
            <button
              type="button"
              className="search-btn px-2 mt-4 w-100"
              onClick={() => import_csv_data()}
            >
              Import
            </button>
          </div>
          <div className="summary-input pl-4">
            <button
              type="button"
              className="reset-btn px-2 w-100 mt-4"
              onClick={reset_import}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="d-flex-left px-4 mt-2">
          <div className="summary-select">
            <label className="mb-1">Type of Data</label>
            <select
              className="pl-2"
              name="type"
              value={exportType}
              onChange={export_type_change}
            >
              <option>----- Select -----</option>
              <option value="indoor_unit">Indoor Unit</option>
              <option value="outdoor_unit">Outdoor Unit</option>
            </select>
          </div>
          <div className="summary-input pl-4">
            <CSVDownloader
              data={exportData}
              filename={exportType}
              type={"button"}
              className="search-btn px-2 mt-4 w-100"
            >
              Export
            </CSVDownloader>
          </div>
          <div className="summary-input pl-4">
            <button
              type="button"
              className="reset-btn px-2 w-100 mt-4"
              onClick={reset_export}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="d-flex-left px-4 mt-3">
          <div className="summary-select">
            <label className="mb-1">View</label>
            <select
              className="pl-2"
              name="view"
              value={view}
              onChange={view_change}
            >
              <option>----- Select -----</option>
              <option value="indoor_unit">Indoor Unit</option>
              <option value="outdoor_unit">Outdoor</option>
            </select>
          </div>
          <div className="summary-input pl-4">
            <button
              type="button"
              className="search-btn px-2 mt-4 w-100"
              onClick={view_config}
            >
              OK
            </button>
          </div>
          <div className="summary-input pl-4">
            <button
              type="button"
              className="reset-btn px-2 w-100 mt-4"
              onClick={reset_view}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="px-4 mt-4 pt-1">
          <hr className="summary-hr" />
        </div>
        <div className="summary-table-container px-4">
          <div className="table-responsive mb-4">
            <table className="table text-center">
              <thead>
                {viewData.length > 0 ? (
                  viewData.map((item, index) => (
                    <tr key={index} id={index}>
                      {item.map((data) => (
                        <th className="align-middle">{data}</th>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>No Data</td>
                  </tr>
                )}
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterData;
