import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

interface UploadedItem {
  id: string;
  images: string[];
  pricePerUnit: number;
  quantity: number;
  totalPrice: number;
  currency: string;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const [uploadedItems, setUploadedItems] = useState<UploadedItem[]>([]);

  return (
    <div className="profile-container">
      <button onClick={() => navigate("/upload")} className="upload-button">
        განათავსე პროდუქტი
      </button>

      <h2 className="section-title">ჩემი განთავსებული პროდუქტები</h2>
      {uploadedItems.length === 0 ? (
        <p>თქვენ ჯერ არაფერი განგითავსებიათ</p>
      ) : (
        <div className="items-grid">
          {uploadedItems.map((item) => (
            <div key={item.id} className="item-card">
              <div className="images-container">
                {item.images.map((src, index) => (
                  <img key={index} src={src} alt="Item" className="item-image" />
                ))}
              </div>
              <p>საცალო ფასი: {item.currency}{item.pricePerUnit}</p>
              <p>რაოდენობა: {item.quantity}</p>
              <p className="total-price">ჯამური ფასი: {item.currency}{item.totalPrice}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;