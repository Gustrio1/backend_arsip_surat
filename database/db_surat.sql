PGDMP         4        	        }            db_surat    15.13    15.13                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            	           1262    16398    db_surat    DATABASE     �   CREATE DATABASE db_surat WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE db_surat;
                postgres    false                        2615    16399    arsip_surat    SCHEMA        CREATE SCHEMA arsip_surat;
    DROP SCHEMA arsip_surat;
                postgres    false            �            1259    16401    surat    TABLE       CREATE TABLE public.surat (
    id integer NOT NULL,
    nama_surat character varying(100) NOT NULL,
    nama_bidang character varying(100) NOT NULL,
    tanggal date NOT NULL,
    file_url text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.surat;
       public         heap    postgres    false            �            1259    16400    surat_id_seq    SEQUENCE     �   CREATE SEQUENCE public.surat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.surat_id_seq;
       public          postgres    false    216            
           0    0    surat_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.surat_id_seq OWNED BY public.surat.id;
          public          postgres    false    215            �            1259    16413    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(100) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16412    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    218                       0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    217            k           2604    16404    surat id    DEFAULT     d   ALTER TABLE ONLY public.surat ALTER COLUMN id SET DEFAULT nextval('public.surat_id_seq'::regclass);
 7   ALTER TABLE public.surat ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            m           2604    16416    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218                      0    16401    surat 
   TABLE DATA           [   COPY public.surat (id, nama_surat, nama_bidang, tanggal, file_url, created_at) FROM stdin;
    public          postgres    false    216   �                 0    16413    users 
   TABLE DATA           7   COPY public.users (id, username, password) FROM stdin;
    public          postgres    false    218   L                  0    0    surat_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.surat_id_seq', 3, true);
          public          postgres    false    215                       0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 1, true);
          public          postgres    false    217            o           2606    16409    surat surat_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.surat
    ADD CONSTRAINT surat_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.surat DROP CONSTRAINT surat_pkey;
       public            postgres    false    216            q           2606    16418    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    218               y   x�3�L��+�πRN�)�y�F��`ę���
�����X*[�Z���XXr2�������������R���I�S!�����#�'��O/%?��3+s=SCccsK�=... a�(�            x�3�LL����44261����� /�     