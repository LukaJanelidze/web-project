import React, { useState, useEffect} from 'react';
import './UploadPage.css';

type CategoryData = {
  [categoryName: string]: {
    subcategories?: {
      [subcategoryName: string]: {
        subSubcategories?: {
          [subSubcategoryName: string]: {
            attributes: string[];
          };
        };
        attributes?: string[];
      };
    };
    attributes?: string[];
  };
};

const categoryData: CategoryData = {
  ტექნიკა: {
    subcategories: {
      'კომპიუტერული ტექნიკა': {
        subSubcategories: {
          'პერსონალური კომპიუტერი': {
            attributes: ['პროცესორის თაობა','გაგრილების ტიპი','დედაბარათის ჩიფსეტი','კვების ბლოკის სიმძლავრე','HDD მოცულობა','SSD მოცულობა','პროცესორის ბუდე','კომპიუტერის ტიპი','კლავიატურის განათებით','პროცესორის ტიპი','ოპერატიულის ტიპი','ოპერატიული მეხსიერება (RAM)','დისკის წამკითხველი','ვიდეო ბარათი','ოპერაციული სისტემა'],
          },
          'ლეპტოპი': {
            attributes: ['ბრენდი','პროცესორის თაობა','HDD','HDD მოცულობა','SSD','SSD მოცულობა','ნოუთბუქის სახეობა','კლავიატურის განათებით','ეკრანის ზომა','პროცესორის ტიპი','მატრიცის ტიპი','რეზოლუცია','სენსორული ეკრანი','პროცესორის სიხშირე','ოპერატიული მეხსიერება (RAM)','ვიდეო ბარათი','ოპერაციული სისტემა','ოპტიკური დისკი'],
          },
          'კონსოლი': {
            attributes: ['Storage', 'Brand'],
          },
          'მონიტორი': {
            attributes: ['Size', 'Resolution', 'Refresh Rate', 'Brand'],
          },
        },
      },
      ტელეფონი: {
        subSubcategories: {
          Android: { attributes: [] },
          iOS: { attributes: [] },
        },
        attributes: ['Screen Size', 'Battery', 'Camera', 'Brand'],
      },
      პლანშეტი: {
        subSubcategories: {
          Android: { attributes: [] },
          iOS: { attributes: [] },
        },
        attributes: ['Screen Size', 'Battery', 'Camera', 'Brand'],
      },
      'საოჯახო ტექნიკა': {
        attributes: ['Type', 'Brand', 'Power'],
      },
      ტელევიზორი: {
        attributes: ['Screen Size', 'Resolution', 'Brand'],
      },
    },
  },
  სპორტი: {
    subcategories: {
      ფეხბურთი: {
        subSubcategories: {
          'საფეხბურთო ფორმები': { attributes: [] },
          'ბუცები': { attributes: ['ზომა'] },
          'შიპოვკა': { attributes: ['ზომა'] },
          'ეკიპირება': { attributes: [] },
          'ფეხბურთის ბურთი': { attributes: [] },
        },
      },
      კალათბურთი: {
        subSubcategories: {
          'საკალათბურთო ფორმები': { attributes: [] },
          'საკალათბურთის ბოტასები': { attributes: ['ზომა'] },
          'ეკიპირება': { attributes: [] },
          'კალათბურთის ბურთი': { attributes: [] },
        },
      },
      ჩოგბურთი: {
        subSubcategories: {
          'ჩოგანი': { attributes: [] },
          'ჩოფბურთის ფეხსაცმელი': { attributes: ['ზომა'] },
          'ეკიპირება': { attributes: [] },
          'ჩოგბურთის ბურთი': { attributes: [] },
        },
      },
      'საბრძოლო ხელოვნება': {
        subSubcategories: {
          'ფორმები': { attributes: [] },
          'ხელთათმანები': { attributes: [] },
          'ეკიპირება': { attributes: [] },
        },
      },
      ტრენაჟორები: {
        attributes: [],
      },
      სხვა: {
        attributes: [],
      },
    },
  },
  ტანსაცმელი: {
    subcategories: {
      'კაცის ტანსაცმელი': {
        subSubcategories: {
          'კოსტუმები': { attributes: ['ზომა', 'მასალა', 'ბრენდი'] },
          'შარვლები': { attributes: ['ზომა' , 'მასალა', 'ბრენდი'] },
          'მაისურები': { attributes: ['ზომა', 'მასალა', 'ბრენდი'] },
          'პერანგები': { attributes: ['ზომა', 'მასალა', 'ბრენდი'] },
          'ქურთუკები': { attributes: ['ზომა', 'მასალა', 'ბრენდი'] },
          'სპორტული ტანსაცმელი': { attributes: ['ზომა', 'მასალა', 'ბრენდი'] },
          'სვიტერები': { attributes: ['ზომა', 'მასალა', 'ბრენდი'] },
          'ფეხსაცმელი': { attributes: ['ზომა', 'მასალა', 'ბრენდი'] },
          'შორტები': { attributes: ['ზომა', 'მასალა', 'ბრენდი'] },
          'ქუდები': { attributes: ['ზომა', 'მასალა', 'ბრენდი'] },
          'ტანსაცმლის აქსესუარები': { attributes: [ 'მასალა', 'ბრენდი'] },
        },
      },
      'ქალის ტანსაცმელი': {
        subSubcategories: {
          'კაბები': { attributes: ['ზომა', 'მასალა', 'ბრენდი', 'სტილი'] },
          'კოსტუმები': { attributes: ['ზომა', 'მასალა', 'ბრენდი'] },
          'კომპლექტები': { attributes: ['ზომა', 'მასალა', 'ბრენდი'] },
          'პერანგები': { attributes: ['ზომა', 'მასალა', 'ბრენდი'] },
          'შარვლები': { attributes: ['ზომა', 'მასალა', 'ბრენდი'] },
          'სპორტული ტანსაცმელი': { attributes: ['ზომა', 'მასალა', 'ბრენდი'] },
          'სვიტერები': { attributes: ['ზომა', 'მასალა', 'ბრენდი'] },
          'ფეხსაცმელი': { attributes: ['ზომა', 'მასალა', 'ბრენდი', 'ქუსლის სიმაღლე'] },
          'ბლუზები': { attributes: ['ზომა', 'მასალა', 'ბრენდი'] },
          'შორტები': { attributes: ['ზომა', 'მასალა', 'ბრენდი'] },
          'ქურთუკები': { attributes: ['ზომა', 'მასალა', 'ბრენდი'] },
          'ტანსაცმლის აქსესუარები': { attributes: ['მასალა', 'ბრენდი'] },
        },
      },
      'ბავშვი - გოგო': {
        subSubcategories: {
          'კაბები': { attributes: ['ზომა', 'მასალა'] },
          'კომპლექტები': { attributes: ['ზომა', 'მასალა'] },
          'პერანგები': { attributes: ['ზომა', 'მასალა'] },
          'შარვლები': { attributes: ['ზომა', 'მასალა'] },
          'სვიტერები': { attributes: ['ზომა', 'მასალა'] },
          'სპორტული ტანსაცმელი': { attributes: ['ზომა', 'მასალა'] },
          'ფეხსაცმელი': { attributes: ['ზომა', 'მასალა', 'ბრენდი'] },
          'ქურთუკები': { attributes: ['ზომა', 'მასალა'] },
          'ქუდები': { attributes: ['ზომა', 'მასალა'] },
        },
      },
      'ბავშვი - ბიჭი': {
        subSubcategories: {
          'კომპლექტები': { attributes: ['ზომა', 'მასალა'] },
          'შარვლები': { attributes: ['ზომა', 'მასალა'] },
          'მაისურები': { attributes: ['ზომა', 'მასალა'] },
          'პერანგები': { attributes: ['ზომა', 'მასალა'] },
          'სვიტერები': { attributes: ['ზომა', 'მასალა'] },
          'სპორტული ტანსაცმელი': { attributes: ['ზომა', 'მასალა'] },
          'ფეხსაცმელი': { attributes: ['ზომა', 'მასალა', 'ბრენდი'] },
          'ქურთუკები': { attributes: ['ზომა', 'მასალა'] },
          'ქუდები': { attributes: ['ზომა', 'მასალა'] },
        },
      },
    },
  },
  'გადასაადგილებელი საშუალება': {
   subcategories: {
    ველოსიპედი: {attributes: []},
    სკუტერი: {attributes: []},
    სკეიტბორდი: {attributes: []},
    როლიკები: {attributes: []},
    სხვა: {attributes: []},
   },
  },
  'ავეჯი': {
    subcategories: {
     'მისაღები ოთახის ავეჯი': {attributes: []},
     'საძინებლის ავეჯი': {attributes: []},
     'სასადილო ოთახის ავეჯი': {attributes: []},
     'სამუშაო სივრცის ავეჯი': {attributes: []},
     'ბავშვთა ოთახის ავეჯი': {attributes: []},
     'გარე სივრცის ავეჯი (აივანი, ეზო)': {attributes: []},
    },
   },
   მუსიკა: {
    subcategories: {
      'აუდიო მოწყობილობები და აქსესუარები': {
        subSubcategories: {
          'დინამიკები': { attributes: [] },
          'ყურსასმენები': { attributes: [] },
          'სხვა': { attributes: [] },
        },
      },
      'მუსიკალური ინსტრუმენტები': {
        subSubcategories: {
          'ფორტეპიანო / კლავიშიანი ინსტრუმენტები': { attributes: [] },
          'გიტარა': { attributes: [] },
          'დასარტყამი ინსტრუმენტები': { attributes: [] },
          'ჩასაბერი ინსტრუმენტები': { attributes: [] },
        },
      },
    },
  },
};

const UploadPage: React.FC = () => {
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [subSubcategory, setSubSubcategory] = useState('');
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);

  const [showForm, setShowForm] = useState(false);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setCategory(selected);
    setSubcategory('');
    setSubSubcategory('');
    setFormData({});
    setShowForm(false);
  };

  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSubcategory(selected);
    setSubSubcategory('');
    setFormData({});
    setShowForm(false);
  };

  const handleSubSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSubSubcategory(selected);
    setFormData({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files).slice(0, 6 - images.length);
      setImages((prevImages) => [...prevImages, ...selectedFiles]);
    }
  };

  const handleDeleteImage = (indexToDelete: number) => {
  setImages(prevImages => prevImages.filter((_, index) => index !== indexToDelete));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting:', {
      category,
      subcategory,
      subSubcategory,
      formData,
      name,
      description,
      images,
    });
    alert('Form submitted! Check console for details.');
  };

  const getAttributes = (): string[] => {
    if (
      category &&
      subcategory &&
      subSubcategory &&
      categoryData[category]?.subcategories?.[subcategory]?.subSubcategories?.[subSubcategory]
    ) {
      return categoryData[category].subcategories![subcategory].subSubcategories![subSubcategory].attributes;
    }
    if (
      category &&
      subcategory &&
      categoryData[category]?.subcategories?.[subcategory]?.attributes
    ) {
      return categoryData[category].subcategories![subcategory].attributes!;
    }
    if (category && categoryData[category]?.attributes) {
      return categoryData[category].attributes!;
    }
    return [];
  };

  useEffect(() => {
    const hasSubSub =
      category &&
      subcategory &&
      categoryData[category]?.subcategories?.[subcategory]?.subSubcategories;
  
    if (hasSubSub) {
      setShowForm(!!subSubcategory);
    } else {
      setShowForm(!!subcategory);
    }
  }, [category, subcategory, subSubcategory]);

  return (
    <div className="upload-page">
      <h1>Upload Product</h1>

      <div className="dropdowns">
        <label>
          კატეგორია
          <select value={category} onChange={handleCategoryChange}>
            <option value="">აირჩიეთ კატეგორია</option>
            {Object.keys(categoryData).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>

        {category && categoryData[category]?.subcategories && (
          <label>
            ქვეკატეგორია
            <select value={subcategory} onChange={handleSubcategoryChange}>
              <option value="">აირჩიეთ ქვეკატეგორია</option>
              {Object.keys(categoryData[category].subcategories!).map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </label>
        )}

        {subcategory && categoryData[category]?.subcategories?.[subcategory]?.subSubcategories && (
          <label>
            ჩამონათვალი
            <select value={subSubcategory} onChange={handleSubSubcategoryChange}>
              <option value="">აირჩიეთ ჩამოთვლილთაგან</option>
              {Object.keys(categoryData[category].subcategories![subcategory].subSubcategories!).map(subSub => (
                <option key={subSub} value={subSub}>{subSub}</option>
              ))}
            </select>
          </label>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="upload-form">
          <label>
            პროდუქტის სახელი
            <input type="text" value={name} onChange={e => setName(e.target.value)} required />
          </label>

          <label>
            აღწერა
            <textarea value={description} onChange={e => setDescription(e.target.value)} required />
          </label>

          {getAttributes().map(attr => (
            <label key={attr}>
              {attr}
              <input
                type="text"
                name={attr}
                value={formData[attr] || ''}
                onChange={handleInputChange}
                required
              />
            </label>
          ))}
        <div className="upload-image">
          <label htmlFor="file-upload" className="custom-file-upload">აირჩიეთ ფოტო</label>
              <input
                id="file-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="input-field"
                disabled={images.length >= 6}
              />
            <div className="image-preview-container">
                {images.map((image, index) => (
                  <div className="image-wrapper" key={index}>
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => handleDeleteImage(index)}
                    >
                      ×
                    </button>
                    <img src={URL.createObjectURL(image)} alt="Preview" className="preview-image" />
                  </div>
                ))}
              </div>
            </div>

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default UploadPage;
