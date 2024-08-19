
const employeeModel = require("../models/employeeModel");

//Create new employee
exports.createEmployee = async (data) => {
  const newEmployee = await new employeeModel(data);
  let result = await newEmployee.save();
  return result;
};

//Find employee with id
exports.getEmployee = async (id) => {
  const result = await employeeModel.findById(id)
  return result;
};

//Search and Pagination
exports.paginationSearch = async (page, limit, search) => {
  let stages = [];
  if (search) {
    stages.push({ // filters the documents based on search criteria
      $match: {
        $or: [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      }
    })
  }
  stages.push({
    $sort: { _id: -1 }
  },
    { // performing both pagination and counting of documnets in parallel
      $facet: {
        data: [{ $skip: (page - 1) * limit }, { $limit: limit }],
        totalCount: [{ $count: "totalDatas" }]
      }
    });
  const aggregationPipeline = [stages]; // combines both stages on a single aggregationpipline
  const result = await employeeModel.aggregate(aggregationPipeline)

  const data = result[0].data;
  const totalDatas = result[0].totalCount[0] ? result[0].totalCount[0].totalDatas : 0;
  const totalPages = Math.ceil(totalDatas / limit);
  searchResult = result[0].search;
  
  return { data, totalDatas, totalPages, searchResult };
};

