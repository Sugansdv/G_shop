import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import api from "../api/axios";

export default function ProductDetail(){

  const {id}=useParams();
  const [product,setProduct]=useState(null);
  const [mainImage,setMainImage]=useState("");

  useEffect(()=>{
    api.get(`/products/${id}/`).then(res=>{
      setProduct(res.data);
      setMainImage(res.data.image);
    });
  },[id]);

  if(!product) return <p>Loading...</p>;

  const shareUrl=window.location.href;

  return(
    <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-2 gap-12">

      {/* ================= IMAGE GALLERY ================= */}
      <div>

        <div className="bg-purple-100 p-6 rounded">
          <img src={mainImage} className="w-full"/>
        </div>

        <div className="flex gap-4 mt-4">
          {[product.image,...product.images.map(i=>i.image)]
          .map((img,i)=>(
            <img
              key={i}
              src={img}
              onClick={()=>setMainImage(img)}
              className="w-20 h-20 object-cover border rounded cursor-pointer"
            />
          ))}
        </div>

      </div>

      {/* ================= DETAILS ================= */}
      <div>

        <p className="text-gray-500">{product.category_name}</p>

        <h1 className="text-3xl font-bold">{product.name}</h1>

        <p className="mt-3">{product.description}</p>

        {/* PRICE */}
        <div className="mt-4 flex gap-4 items-center">
          <span className="text-4xl font-bold">
            ₹ {product.price}
          </span>

          <span className="line-through text-gray-400">
            ₹ {product.old_price}
          </span>
        </div>

        {/* SKU + TAGS */}
        <div className="mt-6 space-y-2">
          <p><b>SKU :</b> {product.sku}</p>
          <p><b>Tags :</b> {product.tags}</p>
        </div>

        {/* SHARE */}
        <div className="flex gap-4 mt-6">

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank"
          >Facebook</a>

          <a
            href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
            target="_blank"
          >Twitter</a>

          <a
            href={`https://pinterest.com/pin/create/button/?url=${shareUrl}`}
            target="_blank"
          >Pinterest</a>

          <a href="https://instagram.com" target="_blank">
            Instagram
          </a>

        </div>

      </div>

    </div>
  );
}