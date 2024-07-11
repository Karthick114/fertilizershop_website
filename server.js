const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const connectDB = require('./logs/DB_Connect');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require("body-parser");

//Node Mailer..
const { sendEmail, sendToEmail, sendToresetEmail } = require("./logs/Mailer");

//Establish the Connections..
connectDB();

//Require Models
const Products = require('./models/productModel');
const Categorys = require('./models/categoryModel');
const UserInfo = require('./models/userModel');
const Orders = require('./models/OrdersModel');



const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//Accessing Linked Folders..
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware setup
app.use(session({
  secret: 'supersecretlongrandomstringhere',
  resave: false,
  saveUninitialized: true
}));

// Middleware to check if user is authenticated
function requireAdminLogin(req, res, next) {
  if (req.session && req.session.AdminId) {
    // console.log("Fi");
    return next();
  } else {
    // console.log("F");
    res.redirect('/'); // Redirect to login page if not authenticated
  }
}

// Middleware to check if user is authenticated
function requireUserLogin(req, res, next) {
  if (req.session && req.session.UserId) {
    // If UserId exists in the session, proceed to the next middleware
    return next();
  } else {
    // If UserId does not exist in the session, send the response to indicate login is required
    return res.json({ status: "login_now" });
  }

}

app.get("/", async (req, res) => {
  const indexPath = path.join(__dirname, 'HTML', 'index.html');
  fs.access(indexPath, fs.constants.F_OK, (err) => {
    if (err) {
      res.sendFile(path.join(__dirname, 'HTML', 'error.html'));
    } else {
      res.sendFile(indexPath);
    }
  });
});

app.all("/products(.html)?", async (req, res) => {
  const indexPath = path.join(__dirname, 'HTML', 'products.html');
  fs.access(indexPath, fs.constants.F_OK, (err) => {
    if (err) {
      res.sendFile(path.join(__dirname, 'HTML', 'error.html'));
    } else {
      res.sendFile(indexPath);
    }
  });
});

app.all("/scheduler(.html)?", async (req, res) => {
  const indexPath = path.join(__dirname, 'HTML', 'scheduler.html');
  fs.access(indexPath, fs.constants.F_OK, (err) => {
    if (err) {
      res.sendFile(path.join(__dirname, 'HTML', 'error.html'));
    } else {
      res.sendFile(indexPath);
    }
  });
});

app.all("/contact(.html)?", async (req, res) => {
  const indexPath = path.join(__dirname, 'HTML', 'contact.html');
  fs.access(indexPath, fs.constants.F_OK, (err) => {
    if (err) {
      res.sendFile(path.join(__dirname, 'HTML', 'error.html'));
    } else {
      res.sendFile(indexPath);
    }
  });
});

app.all("/orders(.html)?", async (req, res) => {
  const indexPath = path.join(__dirname, 'HTML', 'orders.html');
  fs.access(indexPath, fs.constants.F_OK, (err) => {
    if (err) {
      res.sendFile(path.join(__dirname, 'HTML', 'error.html'));
    } else {
      res.sendFile(indexPath);
    }
  });
});

app.all("/makeOrder(.html)?", async (req, res) => {
  const indexPath = path.join(__dirname, 'HTML', 'makeOrder.html');
  fs.access(indexPath, fs.constants.F_OK, (err) => {
    if (err) {
      res.sendFile(path.join(__dirname, 'HTML', 'error.html'));
    } else {
      res.sendFile(indexPath);
    }
  });
});

app.post("/fetchOrders", async (req, res) => {
  
  // after use this...
  if (req.session && req.session.UserId) {
    try {
      const orders = await Orders.find({userid : req.session.UserId});
      var userOrders = [];
      for (const order of orders) {
        const prodDetails = await Products.find({ _id: order.productId });
    
        userOrders.push({
            username: order.username,
            phoneNo: order.phoneNo,
            Address: order.Address,
            status: order.status,
            orderTime: order.orderTime,
            orderPrice : order.orderPrice,
            prodDetails: prodDetails,
            quantity : order.Quantity,
            orderId : order._id
        });
    }
      res.json(userOrders);
    } catch (err) {
      console.error('Error fetching products:', err);
      res.sendFile(path.join(__dirname, 'HTML', 'error.html'));
    }
  } else {
    res.json({ status: "login_now" });
  }
});

app.post("/cancelOrder", async (req, res) => {
  console.log(req.body);
  var updatedOrder = await Orders.findOneAndUpdate(
    { _id: req.body.orderId }, // Query for the order by its ID
    { $set: { status: "Canceled" } }, // Update the status field to "Canceled"
    { new: true } // Return the updated document
);

  if (updatedOrder) {
    res.json({ status: true });
  } else {
    res.json({ status: false });
  }
});


app.post("/login", async (req, res) => {
  // console.log(req.body);
  var avail = await UserInfo.findOne({ email: req.body.email, pwd: req.body.password });
  if (avail) {
    if (avail.role == "Admin") {
      req.session.AdminId = avail._id; // Store user ID in session
      res.json({ status: true, isUser: false });
    }
    else {
      console.log("User Page");
      req.session.UserId = avail._id; // Store user ID in session
      req.session.userName = avail.name;
      req.session.email = avail.email;
      res.json({ status: true, isUser: true });
    }
  } else {
    res.json({ status: false });
  }
});


app.post('/signup', async (req, res) => {
  // console.log(req.rawHeaders);
  let available = await UserInfo.findOne({ email: req.body.email });
  if (!available) {
    try {
      const isAdmin = req.rawHeaders.includes('http://localhost:8080/admin');
      if (isAdmin) {
        const data = await UserInfo.create({
          name: req.body.username,
          email: req.body.email,
          pwd: req.body.password,
          role: "Admin"
        });
      } else {
        const data = await UserInfo.create({
          name: req.body.username,
          email: req.body.email,
          pwd: req.body.password,
          role: "User"
        });
      }
    }
    catch (err) {
      console.log("Sorry Not Added ", err);
      res.sendFile(path.join(__dirname, 'HTML', 'error.html'));
      res.redirect('/error');
    }
    res.json({ status: true });
  }
  else {
    res.json({ status: false });
  }
});

// AdminPage route with authentication middleware
app.get("/admin", requireAdminLogin, (req, res) => {
  const indexPath = path.join(__dirname, 'HTML', 'AdminPage.html');
  fs.access(indexPath, fs.constants.F_OK, (err) => {
    if (err) {
      res.sendFile(path.join(__dirname, 'HTML', 'error.html'));
    } else {
      res.sendFile(indexPath);
    }
  });
});

app.get("/about", (req, res) => {
  const indexPath = path.join(__dirname, 'HTML', 'about.html');
  fs.access(indexPath, fs.constants.F_OK, (err) => {
    if (err) {
      res.sendFile(path.join(__dirname, 'HTML', 'error.html'));
    } else {
      res.sendFile(indexPath);
    }
  });
});

app.all("/forgotPass", (req, res) => {
  const indexPath = path.join(__dirname, 'HTML', 'forgotPass.html');
  fs.access(indexPath, fs.constants.F_OK, (err) => {
    if (err) {
      res.sendFile(path.join(__dirname, 'HTML', 'error.html'));
    } else {
      res.sendFile(indexPath);
    }
  });
});


app.post("/deleteProduct", requireAdminLogin, async (req, res) => {
  const productToUpdate = await Products.deleteOne({ _id: req.body.productID });
  if (productToUpdate) {
    try {
      res.json({ status: true });
    } catch (error) {
      res.redirect('/error');
      console.log("Delete Product Error:", error);
    }
  } else {
    res.json({ status: false });
    console.log('Product not found.');
  }

});


app.post("/addprods", requireAdminLogin, async (req, res) => {
  let available = await Products.findOne({ imgurl: req.body.imgsurl, description: req.body.description, name: req.body.name });
  if (!available) {
    try {
      const data = await Products.create({
        imgurl: req.body.imgsurl,
        description: req.body.description,
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        offer: req.body.offer
      });
    }
    catch (err) {
      console.log("Sorry Not Added ", err);
      res.sendFile(path.join(__dirname, 'HTML', 'error.html'));
    }
    res.json({ status: true });
  }
  else {
    res.json({ status: false });
  }
});

// app.post("/update_product", requireAdminLogin, async (req, res) => {
//   console.log(req.body);
//   const productToUpdate = await Products.deleteOne({ _id: req.body.productID });
//   // console.log(productToUpdate,"HI");
//   if (productToUpdate) {
//     try {
//       const data = await Products.create({
//         imgurl: req.body.imgsurl,
//         description: req.body.description,
//         name: req.body.name,
//         category: req.body.category,
//         price: req.body.price,
//         offer: req.body.offer
//       });
//       res.json({ status: true });
//     } catch (error) {
//       res.redirect('/error');
//       console.log("Update Product Error:", error);
//     }
//   } else {
//     res.json({ status: false });
//     console.log('Product not found.');
//   }

// });

app.post("/update_product", requireAdminLogin, async (req, res) => {
  // console.log(req.body);
  
  const productID = req.body.productID;

  // Validate productID
  // if (!mongoose.Types.ObjectId.isValid(productID)) {
  //   return res.status(400).json({ status: false, message: 'Invalid product ID' });
  // }

  try {
    // Update the product
    const updatedProduct = await Products.findOneAndUpdate(
      { _id: productID },
      {
        imgurl: req.body.imgsurl,
        description: req.body.description,
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        offer: req.body.offer
      },
      { new: true, useFindAndModify: false } // Return the updated document
    );

    if (!updatedProduct) {
      res.json({ status: false, message: 'Product not found' });
      console.log('Product not found.');
    } else {
      console.log('Product updated successfully:', updatedProduct);
      res.json({ status: true, updatedProduct });
    }
  } catch (error) {
    res.redirect('/error');
    console.log("Update Product Error:", error);
  }
});


app.all("/adminOrders(.html)?",requireAdminLogin, async (req, res) => {
  const indexPath = path.join(__dirname, 'HTML', 'adminOrders.html');
  fs.access(indexPath, fs.constants.F_OK, (err) => {
    if (err) {
      res.sendFile(path.join(__dirname, 'HTML', 'error.html'));
    } else {
      res.sendFile(indexPath);
    }
  });
});

app.post("/fetchOrdersALL", requireAdminLogin, async (req, res) => {
  // after use this...
  if (req.session && req.session.AdminId) {
    try {
      const orders = await Orders.find();
      var userOrders = [];
      for (const order of orders) {
        const prodDetails = await Products.find({ _id: order.productId });
        if(prodDetails){
        userOrders.push({
            username: order.username,
            phoneNo: order.phoneNo,
            Address: order.Address,
            status: order.status,
            orderTime: order.orderTime,
            orderPrice : order.orderPrice,
            prodDetails: prodDetails,
            quantity : order.Quantity,
            orderId : order._id,
            isDone : order.isDone
        });
      }
    }
      res.json(userOrders);
    } catch (err) {
      console.error('Error fetching products:', err);
      res.sendFile(path.join(__dirname, 'HTML', 'error.html'));
    }
  } else {
    res.json({ status: "login_now" });
  }
});

app.post("/EditOrder", async (req, res) => {
  console.log(req.body);
  try{
  var updatedOrder = await Orders.findOneAndUpdate(
    { _id: req.body.orderId }, // Query for the order by its ID
    { $set: { status: req.body.task } }, // Update the status field 
    { new: true } // Return the updated document
);

  if (updatedOrder) {
    res.json({ status: true });
  } else {
    res.json({ status: false });
  }
}catch(err){
  console.log("Error on EditOrder", err);
  res.redirect('/error');
}
});

app.get("/fetch_products", async (req, res) => {
  try {
    const products = await Products.find();
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.sendFile(path.join(__dirname, 'HTML', 'error.html'));
  }
});

app.get("/fetch_category", async (req, res) => {

  try {
    const categorys = await Categorys.find();
    res.json(categorys);
  } catch (err) {
    console.error('Error fetching category:', err);
    res.sendFile(path.join(__dirname, 'HTML', 'error.html'));
  }
})

app.post("/update_category", async (req, res) => {
  console.log(req.body.name);
  const productToUpdate = await Categorys.deleteOne({ name: /./ });

  if (productToUpdate) {
    try {
      const updatedProduct = await Categorys.create({ name: req.body.name });

      res.json({ status: true });
    } catch (error) {
      res.sendFile(path.join(__dirname, 'HTML', 'error.html'));
      console.log("UpdateCategory Error:", error);
    }
  } else {
    res.json({ status: false });
    console.log('Product not found.');
  }

});

app.all('/error', async (req, res) => {
  const indexPath = path.join(__dirname, 'HTML', 'error.html');
  fs.access(indexPath, fs.constants.F_OK, (err) => {
    if (err) {
      res.sendFile(path.join(__dirname, 'HTML', 'error.html'));
    } else {
      res.sendFile(indexPath);
    }
  });
});

app.post('/sendMail', async (req, res) => {
  var isDone = await sendEmail("THIS IS FROM SHREE AMMAN AGRO CENTER Website User Query", req.body)
  if(isDone){
    res.json({ status: true }); 
  }else{
    res.json({status:false});
  }
});

function generateUnique6DigitNumber(existingNumbers) {
  let randomNumber;
  do {
      randomNumber = Math.floor(100000 + Math.random() * 900000); // generates a 6-digit number
  } while (existingNumbers.has(randomNumber));
  
  existingNumbers.add(randomNumber); // add the new unique number to the set
  return randomNumber;
}

// Example usage:
const existingNumbers = new Set();

app.post('/placeOrder', async (req, res) => {
  if (req.session && req.session.UserId) {
    if (!false) {
      try {
        // console.log(req.body.pop());
        var details = req.body.pop();
        var otpNumber = generateUnique6DigitNumber(existingNumbers);
        var isDone = await sendToEmail("This is From SHREE AMMAN AGRO CENTER Website User Order Management\nReferencs ID: a#dscsvs12edsd42\n", req.session.email, otpNumber);

        if(isDone){
        req.body.forEach (item => {
          const data =  Orders.create({
            userid : req.session.UserId,
            username : details.userName,
            phoneNo : details.phoneNo,
            Address : details.address.replace("\n"," "),
            productId : item.productId,
            Quantity : item.quantity,
            status : "Waiting",
            isDone : otpNumber,
            orderTime : new Date().toString(),
            orderPrice : item.orderPrice
          });
        });
      }else {
        res.json({ status: false });
      }
       
      }
      catch (err) {
        console.log("Sorry Not Added ", err);
        res.sendFile(path.join(__dirname, 'HTML', 'error.html'));
      }
      res.json({ status: true });
    }
    else {
      res.json({ status: false });
    }

  } else {
    // If UserId does not exist in the session, send the response to indicate login is required
    res.json({ status: "login_now" });
  }

});

var OTPforUser;
var OTP_email;

app.post('/resetPassword', async (req, res) => {
        try {
          // var details = req.body.pop();
          var otpNumber = generateUnique6DigitNumber(existingNumbers);
          OTPforUser = otpNumber;
          OTP_email = req.body.email;
          // console.log("New OTP",otpNumber);

        var isDone = await sendToresetEmail("This is From SHREE AMMAN AGRO CENTER Website User Authentication Management", req.body.email, otpNumber);

        if(isDone){
        res.json({status: true});
      }else {
        res.json({ status: false });
      }
       
      }
      catch (err) {
        console.log("Sorry Not Added ", err);
        res.sendFile(path.join(__dirname, 'HTML', 'error.html'));
      }
});


app.post('/checkOTP', async (req, res) => {
  try {
  // console.log(req.body);
  // var details = req.body.pop();

  
  if(OTPforUser == req.body.otp && OTP_email === req.body.email){
  res.json({status: true});
}else {
  res.json({ status: false });
}
 
}
catch (err) {
  console.log("Sorry Not Added ", err);
  res.sendFile(path.join(__dirname, 'HTML', 'error.html'));
}
});

app.post("/changePassword", async (req, res) => {
  // console.log(req.body);
  
  try{
  const result = await UserInfo.updateOne({ email: req.body.email },{ $set: { pwd: req.body.newPassword } }
);
if (result) {
    console.log('Password updated successfully.');
    res.json({ status: true });
} else {
    console.log('User not found.');
    res.json({ status: false });
}
  }catch (err) {
    console.log("Sorry Not Added ", err);
    res.sendFile(path.join(__dirname, 'HTML', 'error.html'));
  }

});

mongoose.connection.once('open', () => {
  console.log('MongoDB Runs.');
  app.listen(8080, () => console.log(`Server runs on => http://localhost:${8080} .`));
});

