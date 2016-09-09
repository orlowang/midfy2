export interface contextType {
  img: string;
  text: string;
}

export interface entryType {
  entry_id: string;
  value: string;
}

export interface SKUType {
  entrys: entryType[];
  name: string;
  spec_id: number;
}

export interface productType {
  product_id: string;
  price: string;
  stock: number;
  property: string[];
}

export interface goodsListType {
  goods_id: string;
  head_imgs: string[];
  name: string;
  title: string;
  min_price: string;
  max_price: string;
  text_detail: string;
  img_detail: contextType[];
  sunshine_community: boolean;
  extend_product?: boolean;
  specs?: SKUType[];
  shiping: string;
  products: productType[];
}

export interface userInfoType {
  name: string;
  nickname: string;
  sex: number;
  mobile: string;
  province: string;
  city: string;
  district: string;
  road: string;
  project_name: string;
  building_name: string;
  address: string;
}