import React, { useEffect, useRef } from "react";
import Navbar from "../../components/navbar/index";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "bootstrap";
import "datatables.net";
import "datatables.net-bs5";
import "datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css"; // Styles for buttons
import "datatables.net-buttons/js/dataTables.buttons.min.js"; // DataTables Buttons Core
import "datatables.net-buttons-bs5"; // Bootstrap integration for buttons
import "datatables.net-buttons/js/buttons.html5.min.js"; // Export to CSV, Excel, PDF
import "datatables.net-buttons/js/buttons.print.min.js"; // Print view button

import "./style.scss"; // Custom styles

function Index() {
  const tableRef = useRef(null); // Ref to hold the table element

  useEffect(() => {
    const $table = $(tableRef.current);

    // Initialize DataTable with export buttons
    if (!$table.hasClass("dataTable")) {
      $table.DataTable({
        // Disable sorting for all columns
        columnDefs: [
          {
            targets: "_all",
            orderable: false,
          },
        ],
        // DataTables pagination options
        scrollX: true,
        paging: true,
        lengthChange: true,
        lengthMenu: [10, 25, 50, 75, 100],
        pageLength: 10,
        searching: true,
        info: true,
        language: {
          paginate: {
            previous: "Previous",
            next: "Next",
          },
        },
        layout: {
          topStart: {
              buttons: ["pageLength", "copy", "csv", "excel", "pdf", "print"]
          }
      },
        // Add export buttons
        // dom: "Bfrtip",
        // buttons: ["pageLength","copy", "csv", "excel", "pdf", "print"],
        // Add column search functionality
        initComplete: function () {
          var api = this.api();

          // Append an input element under each column header
          $("#searchInputs")
            .find("input")
            .each(function (i) {
              $(this).on("keyup change clear", function () {
                if (api.column(i).search() !== this.value) {
                  api.column(i).search(this.value).draw();
                }
              });
            });
        },
      });
    }

    // Cleanup function to destroy DataTable on component unmount
    return () => {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
    };
  }, []);

  // Generate 70 rows of sample data with unique IDs
  const generateSampleData = () => {
    const data = [];
    for (let i = 1; i <= 70; i++) {
      data.push({
        no: i,
        username: `User${i}`,        // Moved to the front
        date: `2024-08-${i}`,        // Moved to the front
        time: `12:${i % 60}:${i % 60}`, // Moved to the front
        number: `SP/23-DS-${i.toString().padStart(4, '0')}/T1`,
        sender: `Sender ${i}`,
        docType: `Type ${i % 3 + 1}<br />Type ${(i + 1) % 3 + 1}<br />Type ${(i + 2) % 3 + 1}`,
        docNumber: `DOC/${i.toString().padStart(5, '0')}<br />DOC/${i.toString().padStart(5, '0') + 1}`,
        poNumber: `PO${i.toString().padStart(4, '0')}`,
        docDate: `0${i % 3 + 1}.0${i % 3 + 1}.2024<br />0${(i + 1) % 3 + 1}.0${(i + 1) % 3 + 1}.2024`,
        addressee: `Addressee ${i}`,
        attachments: `${i} pages`,
        deliveryType: `Type ${i % 2 + 1}`,
        distributedTo: `Distributed ${i}`,
        emailScan: `Email ${i % 2 + 1}`,
        comments: `Comment ${i}`,
        issuedBy: `Issuer ${i}`,
        envelopeNumber: `${i + 1000}`,
        // Removed `actions` from the data
      });
    }
    return data;
  };

  const sampleData = generateSampleData();

  return (
    <>
      <Navbar />
      <div id="data-table" className="container">
        <table
          id="example"
          ref={tableRef}
          className="table table-striped row-border"
        >
          <thead>
            <tr className="columnsss">
              <th>No#</th>
              <th>Username</th>             {/* Moved to the front */}
              <th>Date</th>                {/* Moved to the front */}
              <th>Time</th>                {/* Moved to the front */}
              <th>Registration (incoming) date</th>
              <th>Registration (incoming) number</th>
              <th>Sender</th>
              <th>Document type</th>
              <th>Document number</th>
              <th>PO number</th>
              <th>Document Date</th>
              <th>Addressee</th>
              <th>Attachments count / paper count</th>
              <th>Delivery type</th>
              <th>Distributed to</th>
              <th>Hard copy's scan is sent by email</th>
              <th>Comments</th>
              <th>Issued by</th>
              <th>Envelope number</th>
            </tr>
            <tr id="searchInputs">
              <th><input type="text" placeholder="Search No#" /></th>
              <th><input type="text" placeholder="Search Username" /></th>
              <th><input type="text" placeholder="Search Date" /></th>
              <th><input type="text" placeholder="Search Time" /></th>
              <th><input type="text" placeholder="Search Registration date" /></th>
              <th><input type="text" placeholder="Search Registration number" /></th>
              <th><input type="text" placeholder="Search Sender" /></th>
              <th><input type="text" placeholder="Search Document type" /></th>
              <th><input type="text" placeholder="Search Document number" /></th>
              <th><input type="text" placeholder="Search PO number" /></th>
              <th><input type="text" placeholder="Search Document Date" /></th>
              <th><input type="text" placeholder="Search Addressee" /></th>
              <th><input type="text" placeholder="Search Attachments count / paper count" /></th>
              <th><input type="text" placeholder="Search Delivery type" /></th>
              <th><input type="text" placeholder="Search Distributed to" /></th>
              <th><input type="text" placeholder="Search Hard copy's scan is sent by email" /></th>
              <th><input type="text" placeholder="Search Comments" /></th>
              <th><input type="text" placeholder="Search Issued by" /></th>
              <th><input type="text" placeholder="Search Envelope number" /></th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((row) => (
              <tr key={row.no}>
                <td>{row.no}</td>
                <td>{row.username}</td>         
                <td>{row.date}</td>            
                <td>{row.time}</td>            
                <td>{row.number}</td>
                <td>{row.sender}</td>
                <td dangerouslySetInnerHTML={{ __html: row.docType }}></td>
                <td dangerouslySetInnerHTML={{ __html: row.docNumber }}></td>
                <td>{row.poNumber}</td>
                <td dangerouslySetInnerHTML={{ __html: row.docDate }}></td>
                <td>{row.addressee}</td>
                <td>{row.attachments}</td>
                <td>{row.deliveryType}</td>
                <td>{row.distributedTo}</td>
                <td>{row.emailScan}</td>
                <td>{row.comments}</td>
                <td>{row.issuedBy}</td>
                <td>{row.envelopeNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Index;
