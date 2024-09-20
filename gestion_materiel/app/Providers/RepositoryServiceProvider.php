<?php

namespace App\Providers;

use App\Interfaces\ComposantRepositoryInterface;
use App\Interfaces\InventaireRepositoryInterface;
use App\Interfaces\LignePretRepositoryInterface;
use App\Interfaces\MaterielRepositoryInterface;
use App\Interfaces\PostRepositoryInterface;
use App\Interfaces\PretRepositoryInterface;
use App\Interfaces\SalleRepositoryInterface;
use App\Interfaces\Type_materielRepositoryInterface;
use App\Interfaces\UserRepositoryInterface;
use App\Repositories\ComposantRepository;
use App\Repositories\InventaireRepository;
use App\Repositories\LignePretRepository;
use App\Repositories\MaterielRepository;
use App\Repositories\PostRepository;
use App\Repositories\PretRepository;
use App\Repositories\SalleRepository;
use App\Repositories\Type_materielRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\ServiceProvider;


class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //

        $this->app->bind(Type_materielRepositoryInterface::class,Type_materielRepository::class);
        $this->app->bind(SalleRepositoryInterface::class , SalleRepository::class);
        $this->app->bind(PostRepositoryInterface::class , PostRepository::class);
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(MaterielRepositoryInterface::class, MaterielRepository::class);
        $this->app->bind(ComposantRepositoryInterface::class , ComposantRepository::class);
        $this->app->bind(PretRepositoryInterface::class , PretRepository::class);
        $this->app->bind(LignePretRepositoryInterface::class , LignePretRepository::class);
        $this->app->bind(InventaireRepositoryInterface::class, InventaireRepository::class);

    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
