'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/Form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/Select';
import { Separator } from '@/shared/ui/Seperator';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '../schema';
import { Input } from '@/shared/ui/Input';
import { Textarea } from '@/shared/ui/Textarea';
import { ImageUploadField } from '@/components/ImageUpload';
import InputPhoneNumber from '@/shared/ui/InputPhoneNumber';
import Button from '@/shared/ui/Button';
import { getHomeResources } from '../_service';
import { IReviewTargets } from '@/shared/types';
import { parseCookies } from 'nookies';
import { apiRequest } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';
import { Rating } from '@smastrom/react-rating';
import { toast } from 'sonner';

interface IProps {
  data: Awaited<ReturnType<typeof getHomeResources>>;
}

function Home({ data }: IProps) {
  const { company_id, branch_id } = parseCookies();

  const { data: branches } = useQuery({
    queryKey: ['get-all-branches'],
    queryFn: () =>
      apiRequest({
        endpoint: 'v1/branch/',
        method: 'GET',
        params: {
          page: 1,
          limit: 10,
        },
        useCompanyId: true,
        customCompanyId: company_id,
      }),
  });
  const { data: company } = useQuery({
    queryKey: ['get-company'],
    queryFn: () =>
      apiRequest({
        endpoint: `v1/company/${company_id}`,
        method: 'GET',
        useCompanyId: true,
        customCompanyId: company_id,
      }),
  });

  useEffect(() => {
    if (company?.colour) {
      document.documentElement.style.setProperty('--primary', company.colour);
    }
  }, [company?.colour]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      branch_id: '',
      company_id: company_id,
      customer_name: '',
      customer_phone: '',
      type: '',
      description: '',
      images: [],
      rate: 0,
      review_target_id: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Form data:', values);
    const data = {
      ...values,
      customer_phone: values?.customer_phone?.trim(),
      branch_id: branch_id
        ? branch_id
        : branches?.branches?.length > 1
        ? branches?.branches[0]?.id
        : values?.branch_id || undefined,
      images: values?.images?.map((el) => el.split('/').at(-1)),
    };

    try {
      // Submit logic here
      await apiRequest({
        endpoint: 'v1/review/',
        method: 'POST',
        body: data,
      }).then(() => {
        form.reset();
        toast('Успешно создано', {
          style: {
            backgroundColor: '#16A34A',
            color: 'white',
            height: '45px',
            border: 'none',
          },
          // icon: '✅',
        });
      });
    } catch (error) {
      console.error('Submit error:', error);
      // Xatoliklarni formga qo'shish
      form.setError('root', {
        type: 'manual',
        message: 'Formani yuborishda xatolik yuz berdi',
      });
    }
  }

  return (
    <div>
      {company?.logo && (
        <div className='relative w-full h-40 aspect-[3/2]'>
          <Image
            src={process.env.BASE_URL + company?.logo}
            alt='banner'
            className='object-cover'
            fill
          />
        </div>
      )}
      <div className='container mx-auto px-4'>
        <h1 className='text-2xl font-semibold text-center my-4'>
          Оставить отзыв
        </h1>
        <Separator className='my-4' />
        <Form {...form}>
          <form
            className='flex flex-col gap-[15px]'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className='flex items-center gap-6 w-full'>
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='h3-regular text-black'>
                      Тип обращения
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Тип обращения' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='recommended'>
                          Рекомендуется
                        </SelectItem>
                        <SelectItem value='complaint'>Жалоба</SelectItem>
                        <SelectItem value='review'>Отзыв</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='review_target_id'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='h3-regular text-black'>
                      Продукт
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Выберите продукт' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {data?.reviewTargets?.review_targets?.map(
                          (el: IReviewTargets) => (
                            <SelectItem key={el.id} value={el?.id}>
                              {el?.name?.ru}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {!branch_id && branches?.branches?.length > 1 && (
              <FormField
                control={form.control}
                name='branch_id'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='h3-regular text-black'>
                      Филиал
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Выберите филиал' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {branches?.branches?.map((el: any) => (
                          <SelectItem key={el.id} value={el?.id}>
                            {el?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name={'rate'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Рейтинг</FormLabel>
                  <FormControl>
                    <Rating
                      style={{ maxWidth: 130 }}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Описание'
                      {...field}
                      ref={(el) => {
                        field.ref(el);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ImageUploadField form={form} />
            <FormField
              control={form.control}
              name='customer_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Имя'
                      {...field}
                      ref={(el) => {
                        field.ref(el);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='customer_phone'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Номер телефона</FormLabel>
                  <FormControl>
                    <InputPhoneNumber
                      control={form.control}
                      name='customer_phone'
                      placeholder='Номер телефона'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator className='my-4' />
            <div className='flex gap-3 text-end justify-end pb-6'>
              <Button variant={'outline'} type='button'>
                Отмена
              </Button>
              <Button className='text-white' variant={'default'} type='submit'>
                Сохранить
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Home;
